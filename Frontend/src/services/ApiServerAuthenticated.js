import axios from "axios";
import useSesion from '../store/useSesion'

function ApiServerAuthenticated() {
  const usuario = useSesion()

  const apiServer= axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL
    ,
    headers: {
        'Content-Type': 'application/json',
    }
  })

  if(usuario.access_token !== ""){
    apiServer.defaults.headers.common['Authorization'] = `Bearer ${usuario.access_token}`;
  }

  return apiServer
}
export default ApiServerAuthenticated

// import.meta.env.VITE_API_SERVER_URL
