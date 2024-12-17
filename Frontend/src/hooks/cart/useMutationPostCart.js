import useSesion from '../../store/useSesion';
import getNewToken from '../../services/login/getNewToken';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'sonner';
import useAutenticacion from '../../store/useAutenticacion';
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated';

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

function useMutationPostCart() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const usuario = useSesion();
    const token = ApiServerAuthenticated();
    const { setShowLogin } = useAutenticacion();

    const addToCart = useMutation({
        mutationFn: async (data) => {
            const response = await token.post("/shop/carro_compra/", data);
            return response;
        },
        onMutate: async () => {
            await queryClient.cancelQueries(['cart']);
            toast.loading('Agregando al carrito...');
        },
        onSettled: () => {
          toast.dismiss()
        },
        onError: async (error, variables) => {
            toast.dismiss()

            if (error.response.status === 401) {
                const newToken = await getNewToken(usuario);

                if (newToken) {
                    usuario.setAccess_token(newToken);
                    await addToCart.mutate(variables);
                } else {
                    setShowLogin(true);
                }
            } else if (error.response.status === 400) {
                toast.error("Cantidad máxima de productos distintos alcanzada o cantidad del mismo alcanzada");
            } else {
                toast.error("Ocurrió un error inesperado");
            }
        },
        onSuccess: (response) => {
            if (response.status === 201) {
                usuario.setCountCart(usuario.countCart + 1);
            }
            toast.success("Producto agregado con éxito");
        }
    });

    return addToCart;
}

export default useMutationPostCart;