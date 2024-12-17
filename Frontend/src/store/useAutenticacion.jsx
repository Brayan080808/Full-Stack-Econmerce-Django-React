import { create } from 'zustand';

const useAutenticacion = create(
    (set) => ({
      // Estado inicial
      showLogin: false,
      showCreateAcount: false,
      showForgotPassword: false,
      showVerifyEmial: false,
      showChangePassword: false,


      // Acciones para actualizar el estado
      setShowLogin: (show) => set(
        show ? 
        { showLogin: show, showCreateAcount:false, showForgotPassword:false, showVerifyEmial:false, showChangePassword:false}:{showLogin: show}
      ),

      setShowCreateAcount: (show) => set(
        show ? 
        { showLogin: false, showCreateAcount: show, showForgotPassword:false, showVerifyEmial:false, showChangePassword:false}:{showCreateAcount: show }
      ),
        
      setShowForgotPassword: (show) => set(
        show ? 
        { showLogin: false, showCreateAcount:false, showForgotPassword:show}:{showForgotPassword: show, showVerifyEmial:false, showChangePassword:false}
      ),

      setShowVerifyEmial: (show) => set(
        show ? 
        { showLogin: false ,showCreateAcount:false ,showForgotPassword:false, showVerifyEmial:show}:{showVerifyEmial: show}
      ),
      setShowChangePassword: (show) =>set(
        show ? 
        { showLogin: false ,showCreateAcount:false ,showForgotPassword:false, showVerifyEmial:false, showChangePassword:show}:{showChangePassword: show}
      ),
     
      // Actualizar el estado cada 5 segundos
      
    }),
  )
;

export default useAutenticacion;

