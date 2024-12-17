import useSesion from '../../store/useSesion';
import getNewToken from '../../services/login/getNewToken';
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated';
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner';
import useAutenticacion from '../../store/useAutenticacion'





function useMutationPatchCart(){
    const queryClient = useQueryClient()
    const usuario = useSesion()
    const token = ApiServerAuthenticated()
    const { setShowLogin } = useAutenticacion()


    const patchToCart = useMutation({
        mutationFn: async ({id_carro_compra,value}) =>  
          { 
            const response = await token.patch(`/shop/carro_compra/${id_carro_compra}/`,{"cantidad_del_producto":value})
            
           
          },
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
              await patchToCart.mutate(variables)  
            }
            else{
              setShowLogin(true)
            }
          }
          else{
            toast.error("Ocurrio un error inesperado")
          }
        },
      })
    return patchToCart
} 
export default useMutationPatchCart