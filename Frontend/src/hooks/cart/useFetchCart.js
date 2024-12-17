import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import useSesion from '../../store/useSesion'
import useAutenticacion from '../../store/useAutenticacion'
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated'


function useFetchCart(url){
    const usuario = useSesion()
    const token = ApiServerAuthenticated()
    const { setShowLogin } = useAutenticacion()
    

    const {isPending, isError, data, error, isSuccess ,refetch} = useQuery({
        queryKey: ['cart'], 
        queryFn: () => token.get(url).then((response) => response.data),
        retry: false,
        onError: async (error, variables ) => {

            if( error.response.status == 401){
              const newToken = await getNewToken(usuario)

              if(newToken){
            
                usuario.setAccess_token(newToken)          
                await refetch()  
              }
              else{
                setShowLogin(true)
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
        data: data ?? [] 
    }
} 
export default useFetchCart