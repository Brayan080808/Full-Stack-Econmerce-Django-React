import ApiServer from "../ApiServer"

const getNewToken = (usuario) => {
    return(

        ApiServer.post('api/token/refresh/', {
                        
            refresh: usuario.refresh_token
            
        }).then((response) => response.data.access
            
        ).catch((error) => {
            if (error.response.status === 401){
                usuario.logout()  
            }
            error
        })
    )
}
export default getNewToken