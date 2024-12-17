import useSesion from '../../store/useSesion';
import getNewToken from '../../services/login/getNewToken';
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner';
import useAutenticacion from '../../store/useAutenticacion'
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated';


const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

function useMutationDeleteCart(){
    const queryClient = useQueryClient()
    const usuario = useSesion()
    const token = ApiServerAuthenticated()
    const { setShowLogin } = useAutenticacion()


    const deleteToCart = useMutation({
        mutationFn: (id_carro_compra) => token.delete(`/shop/carro_compra/${id_carro_compra}/`),
        onMutate: async () =>
        {        
            await queryClient.cancelQueries(['cart'])

        },
        onError: async (error, variables ) => {
          toast.dismiss()

          if( error.response.status == 401){
        
        
            const newToken = await getNewToken(usuario)

            if(newToken){
          
              usuario.setAccess_token(newToken)
        
              await deleteToCart.mutate(variables)  
            }
            else{
              setShowLogin(true)
            }
          }
          else{
            toast.error("Ocurrio un error inesperado")
          }
        },

        onSuccess: (variables, context) => {
          usuario.setCountCart(usuario.countCart-1)
          queryClient.setQueryData(['cart'], (oldData) => {
            if (!oldData) return oldData;
            return  oldData.filter(item => item.id_carro_compra !== context);
          });

        }
    
    })

    return deleteToCart

} 
export default  useMutationDeleteCart