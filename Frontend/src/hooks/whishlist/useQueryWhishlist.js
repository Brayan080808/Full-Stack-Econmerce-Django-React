import { useQuery } from '@tanstack/react-query'
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated'
import { toast } from 'sonner'
import useSesion from '../../store/useSesion'






function useQueryWhishlist(){
    const usuario = useSesion()
    const token = ApiServerAuthenticated()
    

    const {isPending, isError, data, error, isSuccess ,refetch} = useQuery({
        queryKey: ['whishlist'], 
        queryFn: () => token.get("/whishlist/"),
        onError: async (error, variables ) => {
        
            if( error.response.status == 401){
              const newToken = await getNewToken(usuario)

              if(newToken){
            
                usuario.setAccess_token(newToken)          
                await refetch()  
              }
              else{
                navigate('/login')
              }
            }
            else{
              toast.error("Ocurrio un error inesperado")
            }
          },
       }  
    )
  
    return {
        isPending, 
        isError,
        error, 
        data: data?.data ?? [] 
    }
} 
export default useQueryWhishlist