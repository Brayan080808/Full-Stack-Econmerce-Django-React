import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import ApiServerAuthenticated from "../../services/ApiServerAuthenticated";
import { toast } from 'sonner';
import getNewToken from '../../services/login/getNewToken';
import useSesion from "../../store/useSesion";

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));



const useMutationPostComments = () => {
    const queryClient = useQueryClient();
    const { id } = useParams()
    const token = ApiServerAuthenticated()
    const usuario = useSesion()

    const postComment = async (data) => {
        // await delay(2000);
        await token.post("/comentarios/actions/", {...data,producto: id});
    }

    const addToComment = useMutation({
        mutationFn: (post) => postComment(post),
        onMutate: async (newComment) => {
            await queryClient.cancelQueries(['comments']);

            // const previousComments = queryClient.getQueryData(['comments']);
            
            // const newCommentToAdd = {
            //     id_comentario: 0, // Ajusta esto si tienes un ID del servidor
            //     post: newComment,
            //     username: usuario.user.username,
            //     fecha_publicacion: new Date().toISOString().split('T')[0],
            // };

            // queryClient.setQueryData(['comments'], (oldData) => {
            //     return {
            //         count: (oldData?.count || 0) + 1,
            //         next: null,
            //         previous: null,
            //         results: [...(oldData?.results || []), newCommentToAdd]
            //     };
            // });

            // return { previousComments };
        },
        onError: async (error, variables, context) => {
            
            if( error.response.status == 401){
                
        
        
                const newToken = await getNewToken(usuario)
    
                if(newToken){
                 
              
                  usuario.setAccess_token(newToken)
            
                  await addToComment.mutate(variables)  
                  
                }   
              }
            
            toast.error('Ocurrio un error inesperado')
            
                
        },
        onSuccess: () => {
            toast.success("Comentario Agregado")
        }
        ,
        onSettled: () => {
            queryClient.invalidateQueries(['comments']);
            
        }
    });

    
    return addToComment;
}
export default useMutationPostComments;


