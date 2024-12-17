import useSesion from '../../store/useSesion';
import { useForm } from 'react-hook-form';
import useAutenticacion from '../../store/useAutenticacion'
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'sonner';
import ApiServer from '../../services/ApiServer';


const CreateAccount = () =>{
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const { setShowVerifyEmial, setShowLogin } = useAutenticacion()
    const { login, setAccess_token, setRefresh_token, setUser } = useSesion();
    const password = watch('password');
    const [viewPassword, setViewPassword] = useState(false);
    const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        try{
            const response = await ApiServer.post("api/register/",data)
            
            if (response.status === 201){
                setUser({'id':response.data.id})
                setShowVerifyEmial(true)
            }

        }catch(error){
            toast.error(error.response.data.message)
        }
    };

    return(
        
            <>
            <h2 className="text-center text-2xl font-bold text-yellow mb-4">Crear Cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">Usuario:</label>
                    <input 
                        type="text" 
                        id="username" 
                        {...register('username', { required: 'Este campo es obligatorio' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{"*"+errors.username.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Correo Electrónico:</label>
                    <input 
                        type="email" 
                        id="email" 
                        {...register('email', { required: 'Este campo es obligatorio' })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{"*"+errors.email.message}</p>}
                    
                </div>

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
                    Crear Cuenta
                </button>
            </form>

            <div className="mt-4 text-center">
                <button onClick={() => setShowLogin(true)} className="text-yellow hover:underline">
                    ¿Ya tienes una cuenta? Inicia sesión
                </button>
            </div>
        </>
        
    )
}
export default CreateAccount
