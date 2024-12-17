import { useForm } from 'react-hook-form';
import useAutenticacion from '../../store/useAutenticacion';
import useSesion from '../../store/useSesion';
import { toast } from 'sonner';
import ApiServer from '../../services/ApiServer';

const PasswordForgot = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {setShowChangePassword, setShowLogin} = useAutenticacion()
    const { setUser } = useSesion()


    const onSubmit = async (data) => {
        try{
            const response = await ApiServer.get(`api/change/password/?info=${data['info']}&/`)
    
            setUser({'id':response.data.id})
            setShowChangePassword(true)

        }catch(error){
            toast.error(error.response.data.message)
        }
        
        
    };

    return(
        <>
            
                <h2 className="text-center text-2xl font-bold text-yellow mb-4">Recuperar Contraseña</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Correo Electrónico or Username" 
                            {...register('info', { required: 'Este campo es obligatorio' })}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-yellow"
                        />
                        {errors.info && <p className="text-red-500 text-sm mt-1">{"*"+errors.info.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-yellow text-white font-bold py-2 rounded-md hover:bg-black transition duration-200"
                    >
                        Enviar Instrucciones
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button onClick={() => setShowLogin(true)} className="text-yellow hover:underline">
                        Volver a Iniciar Sesión
                    </button>
                </div>
            
        </>
    )
}
export default PasswordForgot

