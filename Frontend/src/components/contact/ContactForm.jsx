import { useForm } from "react-hook-form";
import useSendEmail from "../../hooks/contact/useSendEmail";



const ContactForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { mutate, isPending } = useSendEmail()
    const handleOnSubmit = (data) => { 
        mutate(data)
        reset()
    }
   
    
 
    return(
    <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-4">
            <input
                id="name" 
                type="text"
                className="min-h-[48px] bg-[#F2F6FD] border rounded-xl focus:outline-none focus:border-[#b0b435] w-full px-5"
                placeholder="Enter Name"
                {...register('name', { required: 'Este campo obligatorio' })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          
        </div>
        <div className="mb-4">
            <input
                id="email"
                type="email"
                className="min-h-[48px] bg-[#F2F6FD] border rounded-xl focus:outline-none focus:border-[#b0b435] w-full px-5"
                placeholder="Enter Email"
                {...register('email', { required: 'Este campo obligatorio' })}  
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        </div>
        <div className="mb-4">
            <textarea
                id="post"
                className="min-h-[48px] bg-[#F2F6FD] border rounded-xl focus:outline-none focus:border-[#b0b435] w-full px-5 py-3"
                placeholder="Enter Message"
                rows="4"
                {...register('post', { required: 'Este campo obligatorio' })}  
            />
            {errors.post && <p className="text-red-500">{errors.post.message}</p>}

          
        </div>
        <div className="text-start">
            <button
                type="submit"
                className={`${isPending && ' opacity-30 pointer-events-none'}  bg-yellow hover:bg-black  text-white px-8 py-3 rounded mb-4 transition-colors`}
            >
                Submit
            </button>
        </div>
    </form>
    )
};
export default ContactForm