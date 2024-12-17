import useSesion from "../store/useSesion";
import { useNavigate } from "react-router-dom";
import { useHistoryStore } from "../store/useHistoryStore";
import ApiServer from "../services/ApiServer";

const Logout = () =>{
    const { refresh_token,access_token,logout,setAccess_token,setRefresh_token } = useSesion()
    const navigate = useNavigate()
    const history = useHistoryStore()

    async function useLogout() {
      try {

        if (history.currentPage === '/cart' || history.currentPage === '/whishlist'){
          navigate('/')
        }
        else{
          navigate(history.currentPage)
        }
        
        await ApiServer.post('/api/token/blacklist/', {
          refresh: refresh_token,
        }, {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });
    
        setAccess_token('');
        setRefresh_token('');
        logout()
        window.location.reload();

      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
    return(
        <div className=" bg-yellow  cursor-pointer p-[0.4rem] hover:scale-105">
            <button onClick={useLogout}>Logout</button>
        </div>
    )
}
export default Logout