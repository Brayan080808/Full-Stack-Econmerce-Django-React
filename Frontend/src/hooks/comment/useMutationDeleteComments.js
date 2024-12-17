import { useMutation,useQueryClient } from "@tanstack/react-query"
import useSesion from "../../store/useSesion"
import getNewToken from "../../services/login/getNewToken"
import { toast } from "sonner"
import ApiServerAuthenticated from "../../services/ApiServerAuthenticated"


function useMutationComments(){

    const queryClient = useQueryClient()
    const token = ApiServerAuthenticated()
    const usuario = useSesion()

    const deleteToComment = useMutation({
        mutationFn: (id_comentario) => token.delete(`/comentarios/actions/${id_comentario}/`),
        onMutate: async () =>
        {

            
        
            await queryClient.cancelQueries(['comments'])
   

        },
        onError: async (error, variables, context) => {
            if( error.response.status == 401){
                
        
        
                const newToken = await getNewToken(usuario)
    
                if(newToken){
                 
              
                  usuario.setAccess_token(newToken)
            
                  await deleteToComment.mutate(variables)  
                  
                }   
              }
        },

        onSettled: () => {queryClient.invalidateQueries(['comments']),toast.success("Comentario eliminado")}
    
    })

    return deleteToComment

} 
export default useMutationComments