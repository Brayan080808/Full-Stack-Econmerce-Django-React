import { useForm } from 'react-hook-form';
import useSesion from '../../store/useSesion';
import useAutenticacion from '../../store/useAutenticacion'
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from 'react';
import ApiServer from '../../services/ApiServer';



const Login = () => {
    const { login, setAccess_token, setRefresh_token, setUser } = useSesion();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { setShowCreateAcount,setShowForgotPassword, setShowVerifyEmial } = useAutenticacion()
    const [viewPassword, setViewPassword] = useState(false);

    

    
    const onLoginGoogle = async (codeResponse) => {
        try{
            
            
            const code = codeResponse.credential
            const response = await ApiServer.post("verify/google/",{"token":code})

            const user = await ApiServer.get('user/data/', {
                headers: { 'Authorization': `Bearer ${response.data.access}` }
            });

            setUser(user.data)
            setAccess_token(response.data.access);
            setRefresh_token(response.data.refresh);
            login();
            window.location.reload();
    
        }
        catch {
            setShowCreateAcount(true)
            

        }
  }


    const handleForgotPassword = () =>{
        setShowForgotPassword(true)
    }
    

    const onSubmit = async (data) => {
        try {
            const response = await ApiServer.post('api/login/', data);
            const user = await ApiServer.get('user/data/', {
                headers: { 'Authorization': `Bearer ${response.data.access}` }
            });

            setUser(user.data);
            setAccess_token(response.data.access);
            setRefresh_token(response.data.refresh);
            login();
            
            window.location.reload();
        } catch(error) {
            if (error.response.status===401){
                toast.error("Usuario o contrasena incorrecto")
            }
            else if (error.response.status===412){
                setUser({'id':error.response.data.id})
                setShowVerifyEmial(true)
            }
            
        }
        finally{
            reset();
        }
    };

   

    return (
            <>
                
                <h2 className="text-center text-2xl font-bold text-yellow mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Usuario:</label>
                        <input 
                            placeholder='Username or email'
                            type="text" 
                            id="info" 
                            {...register('info', { required: 'Este campo es obligatorio' })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                        />
                        {errors.info && <p className="text-red-500">{errors.info.message}</p>}
                    </div>

                    <label htmlFor="password" className="block text-gray-700">Contraseña:</label>
                    <div className=" relative">
                        
                        <input 
                            placeholder='Password'
                            type={viewPassword ? 'text' : 'password'}  
                            id="password" 
                            {...register('password', { required: 'Este campo es obligatorio' })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                        />
                        
                        <div className='flex absolute top-0 right-0 h-full items-center'>
                            <span onClick={() => setViewPassword(!viewPassword)} className="mr-2 mt-1 hover:text-yellow transition-colors cursor-pointer"
                            >
                                {viewPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                            </span>
                        </div>
                    </div>
                    <div className='mb-4'>
                        {errors.password && <p className=" text-red-500">*{errors.password.message}</p>}

                    </div>
                  

                    <button 
                        type="submit" 
                        className="w-full bg-yellow text-white font-bold py-2 rounded-md hover:bg-black transition duration-200"
                    >
                        Iniciar Sesión
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button onClick={handleForgotPassword} className="text-yellow hover:underline">
                        ¿Olvidé mi contrasena?
                    </button>
                </div>

                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>


                <div className='flex justify-center'>
                    <GoogleLogin onSuccess={onLoginGoogle}  />
                </div>

                <div className="mt-2">
                    <button onClick={() => setShowCreateAcount(true)} className="block text-yellow bg-lightGrey hover:bg-yellow hover:text-white font-bold py-2 rounded-md transition duration-200 w-full">
                        Crear cuenta
                    </button>
                </div>

                

            </>        
    );
};
export default Login

