import { useForm } from 'react-hook-form';
import useSesion from '../../store/useSesion';
import useAutenticacion from '../../store/useAutenticacion';
import { useState, useEffect } from 'react';
import { toast } from 'sonner'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ApiServer  from '../../services/ApiServer'

const ChangePassword = () => {
    const [isVerifying, setIsVerifying] = useState(true);
    const [code, setCode] = useState(0);
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

    const [isTransitioning, setIsTransitioning] = useState(false);
    const { register, handleSubmit, watch, reset ,formState: { errors } } = useForm();
    const { setShowVerifyEmial, setShowChangePassword } = useAutenticacion();
    const { login, setAccess_token, setRefresh_token, setUser, user } = useSesion();
    const [timer, setTimer] = useState(0);
    const password = watch('password');
    
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

   
    

    const handleResend = async () => {
      try{
          const response = await ApiServer.get(`resend/mail/${user.id}/`)
          
          toast.success('Codigo reenviado revisa tu email')
          setTimer(30);
      }
      catch(error){
          toast.error('Error al mandar el codigo')
      }
      
    }

    const onRegister = async (data) => {
        setIsTransitioning(true);
        setTimeout(async () => {
            try {
                setCode(data['code'])
                setIsVerifying(false);
            } finally {
                setShowVerifyEmial(false);
                setIsTransitioning(false);
            }
        }, 300); // Duración del fade-out
    };

    const onChangePassword = async (data) => {
            try {
                const response = await ApiServer.patch(`api/change/password/`, {
                    id: user.id,
                    password: data.password,
                    code: code,
                });
                

                setUser(user.data);
                setAccess_token(response.data.access_token);
                setRefresh_token(response.data.refresh_token);
                login();
                reset();
                window.location.reload();
                
            } catch (error) {
                if (error.response.status === 401) 
                    {   toast.error(error.response.data.menssage);
                        
                    }
                else{
                    toast.error('Error al cambiar la contrasena verifique que esa cumpla las condiciones de seguridad')
                }
            } 
        ; 
    };

    return (
        <div className="flex flex-col items-center">
            <div className={`transition-all duration-300 ${isTransitioning ? ' animate-scale-out ' : ' animate-scale-in'}`}>
                {isVerifying ? (
                    <>
                        <h2 className="text-center text-2xl font-bold text-yellow mb-4">Verifica tu Correo</h2>
                        <p className="text-gray-700 text-center mb-4">
                            Hemos enviado un código de verificación a tu correo electrónico. 
                            Por favor, ingrésalo a continuación.
                        </p>
                        <form onSubmit={handleSubmit(onRegister)} className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="code" className="block text-gray-700">Código de Verificación:</label>
                                <input 
                                    type="text" 
                                    id="code" 
                                    {...register('code', { required: 'Este campo es obligatorio' })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                                />
                                {errors.code && <p className="text-red-500 text-sm mt-1">{"*"+errors.code.message}</p>}
                            </div>

                            <button 
                                type="submit" 
                                className="w-full bg-yellow text-white font-bold py-2 rounded-md hover:bg-black transition duration-200"
                            >
                                Verificar Código
                            </button>
                        </form>
                        <div className="mt-4 text-center">
                            <button onClick={handleResend} className={`text-yellow hover:underline ${timer > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={timer > 0}>
                            {timer > 0 ? `Reenviar en ${timer}s` : '¿No recibiste el código? Reenviar'}
                  
                </button>
                        </div>
                    </>
                ) : (
                    <>
      <h2 className="text-center text-2xl font-bold text-yellow mb-4">Cambia tu Contraseña</h2>
      <p className="text-gray-700 text-center mb-4">
        Por favor, ingresa tu nueva contraseña.
      </p>
      <form onSubmit={handleSubmit(onChangePassword)} className="mb-4">
       
      <div className="mb-4 ">
            <label htmlFor="password" className="block text-gray-700">Nueva Contraseña:</label>
                <div className='relative'>
                    <input 
                        type={viewPassword ? 'text' : 'password'} 
                        id="password" 
                        {...register('password', {
                          required: 'Este campo es obligatorio',
                          minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres',
                          },
              
                    validate: value => {
                            const hasUpperCase = /[A-Z]/.test(value);
                            const hasLowerCase = /[a-z]/.test(value);
                            const hasNumber = /[0-9]/.test(value);
                            const hasSpecialChar = /[!@#$%^&*]/.test(value);
                    
                            if (!hasUpperCase) return 'Debe contener al menos una letra mayúscula';
                            if (!hasLowerCase) return 'Debe contener al menos una letra minúscula';
                            if (!hasNumber) return 'Debe contener al menos un número';
                            if (!hasSpecialChar) return 'Debe contener al menos un carácter especial';
                            return true; // Si todas las validaciones pasan
                        }
                    })}
                    className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                />
          <div className=' absolute right-0 top-0 h-full  flex items-center'>
            <span onClick={() => setViewPassword(!viewPassword)} className="mr-2
            mt-1 hover:text-yellow transition-colors cursor-pointer">

                {viewPassword ? <AiFillEyeInvisible size={20}/> : <AiFillEye size={20} />}
          </span>

          </div>
          

                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{"*"+errors.password.message}</p>}
            </div>

            <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block text-gray-700">Confirmar Nueva Contraseña:</label>
          <div className='relative '>
            <input 
                type={viewConfirmPassword ? 'text' : 'password'} 
                id="confirmPassword" 
                {...register('confirmPassword', {
                  required: 'Se requiere confirmar la contraseña',
                  validate: value => 
                    value === password || 'Las contraseñas no coinciden',
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
            />
          <div className='flex absolute top-0 right-0 h-full items-center'>
            <span onClick={() => setViewConfirmPassword(!viewConfirmPassword)} className="mr-2
            mt-1 hover:text-yellow transition-colors cursor-pointer"
            >
            {viewConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
          </div>
        </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{"*"+errors.confirmPassword.message}</p>}
            </div>

        <button 
          type="submit" 
          className="w-full bg-yellow text-white font-bold py-2 rounded-md hover:bg-black transition duration-200"
        >
          Cambiar Contraseña
        </button>
      </form>

                    </>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;






