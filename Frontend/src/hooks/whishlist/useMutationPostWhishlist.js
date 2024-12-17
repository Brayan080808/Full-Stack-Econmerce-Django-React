import useSesion from '../../store/useSesion';
import getNewToken from '../../services/login/getNewToken';
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner';
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated';
import useAutenticacion from '../../store/useAutenticacion'
const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));


function useMutationPostWhishlist(){
    const queryClient = useQueryClient()
    const usuario = useSesion()
    const token = ApiServerAuthenticated()
    const {setShowLogin} = useAutenticacion()

    
  

    const addToWhishlist = useMutation({
        mutationFn: (data) => token.post("/whishlist/",data),
        onMutate:  (data) =>
        {
            queryClient.cancelQueries(['whishlist'])
        },
        onError: async (error, variables ) => {

          if( error.response.status == 401){
            const newToken = await getNewToken(usuario)

            if(newToken){
          
              usuario.setAccess_token(newToken)
        
              await addToWhishlist.mutate(variables)  
            }
            else{
              setShowLogin(true)
            }
          }
          else if( error.response.status == 400){
            toast.error("Lista de deseos llena")}
          else{
            toast.error("Ocurrio un error inesperado")
          }
        },
    })
    return addToWhishlist
} 
export default useMutationPostWhishlist