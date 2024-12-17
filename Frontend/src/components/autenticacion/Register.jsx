import Login from '../autenticacion/Login';
import Autenticacion from '../autenticacion/Autenticacion';
import CreateAccount from '../autenticacion/CreateAcount';
import VerifyEmial from '../autenticacion/VerifyEmail';
import ChangePassword from '../../components/autenticacion/ChangePassword'
import PasswordForgot from '../autenticacion/PasswordForgot';
import useAutenticacion from '../../store/useAutenticacion';



const Register = () => {

    const {showLogin, showCreateAcount, showForgotPassword, showChangePassword, setShowLogin, showVerifyEmial, setShowCreateAcount, setShowForgotPassword, setShowVerifyEmial, setShowChangePassword} = useAutenticacion()


    return(
        <>
        
        {showLogin &&   <Autenticacion  setShow={setShowLogin} show={showLogin}>
                            <Login />
                            
                        </Autenticacion>}

        {showCreateAcount &&    <Autenticacion  show={showCreateAcount} setShow={setShowCreateAcount}>
                                    <CreateAccount />
                                </Autenticacion>}

        {showVerifyEmial &&    <Autenticacion  show={showVerifyEmial} setShow={setShowVerifyEmial}>
                                    <VerifyEmial/>
                                </Autenticacion>}

        {showForgotPassword && <Autenticacion show={showForgotPassword} setShow={setShowForgotPassword}>
                                    <PasswordForgot />
                                </Autenticacion>}

        
        {showChangePassword &&  <Autenticacion show={showChangePassword} setShow={setShowChangePassword}>
                                    <ChangePassword />
                                </Autenticacion>}
    </>
    )
}
export default Register;