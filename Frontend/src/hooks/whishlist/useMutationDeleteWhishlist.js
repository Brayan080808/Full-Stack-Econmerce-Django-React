import useSesion from '../../store/useSesion';
import getNewToken from '../../services/login/getNewToken';
import { useNavigate } from 'react-router-dom';
import { useMutation,useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner';
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated';
import useAutenticacion from '../../store/useAutenticacion'


const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

function useMutationDeleteWhishlist(){
    const queryClient = useQueryClient()
    const usuario = useSesion()
    const token = ApiServerAuthenticated()
    const {setShowLogin} = useAutenticacion()
    

    const deleteToWhishlist = useMutation({
        mutationFn: (id_whishlist) => token.delete(`/whishlist/${id_whishlist}/`),
        onMutate: async () =>
        {        
            await queryClient.cancelQueries(['whishlist'])
        },
        onError: async (error, variables ) => {
            

          if( error.response.status == 401){
        
        
            const newToken = await getNewToken(usuario)

            if(newToken){
          
              usuario.setAccess_token(newToken)
        
              await deleteToWhishlist.mutate(variables)  
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
          
          queryClient.setQueryData(['whishlist'], (oldData) => {
            if (!oldData) return oldData;
            

            const newData = {... oldData}
            newData.data = oldData.data.filter(item => item.id_whishlist !== context)
           
            return newData;
          });
        }
    
    })

    return deleteToWhishlist

} 
export default  useMutationDeleteWhishlist