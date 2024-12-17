import { useForm } from 'react-hook-form';
import useSesion from '../../store/useSesion';
import useAutenticacion from '../../store/useAutenticacion'
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import ApiServer from '../../services/ApiServer';



const VerifyEmail = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { setShowVerifyEmial } = useAutenticacion()
    const { login, setAccess_token, setRefresh_token, setUser, user:usuario} = useSesion();

    const [timer, setTimer] = useState(0);
    
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

    
    const onRegister = async (data) => {
        try{
           
            const response = await ApiServer.get(`api/register/?code=${data['code']}&id=${usuario.id}`);
            const user = await ApiServer.get('user/data/', {
                headers: { 'Authorization': `Bearer ${response.data.access_token}` }
            });

            setUser(user.data);  
            setAccess_token(response.data.access_token);
            setRefresh_token(response.data.refresh_token);
            login();
            reset();
            window.location.reload();
            
        }finally{
            setShowVerifyEmial(false)
        }

        
    };

    const handleResend = async () => {
        try{
            const response = await ApiServer.get(`resend/mail/${usuario.id}/`)
            
            toast.success('Codigo reenviado revisa tu email')
            setTimer(30);
        }
        catch(error){
            toast.error('Error al mandar el codigo')
        }
        
      }

    return (
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
                    disabled={timer > 0}
                >
                    {timer > 0 ? `Reenviar en ${timer}s` : '¿No recibiste el código? Reenviar'}
                  
                </button>
            </div>
        </>
    );
};

export default VerifyEmail;