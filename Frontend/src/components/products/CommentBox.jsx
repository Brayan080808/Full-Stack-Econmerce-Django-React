import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import useSesion from "../../store/useSesion";
import useAutenticacion from "../../store/useAutenticacion";

const CommentBox = ({ mutate }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [rating, setRating] = useState(1);
    const usuario = useSesion()
    const { setShowLogin } = useAutenticacion()
    const [isFormOpen,setIsFormOpen] = useState(false)



    const onSubmit = (data) => {
        
        const reviewData = { ...data, rating };
        mutate(reviewData);
        reset();
        setRating(1);
        setIsFormOpen(false);
    };

    
    const handleSendComment = () => {
        if(usuario.isLoggedIn) setIsFormOpen(!isFormOpen)
        else setShowLogin(true)
    }

    return (
        <>
            <div className="mb-8">
                <button
                    onClick={handleSendComment}
                    className="w-full bg-yellow text-white hover:opacity-90 font-bold py-2 px-4 rounded flex items-center justify-center"
                >
                    {isFormOpen ? "Hide review form" : "Write a review"}
                </button>
            </div>

                <div className={`bg-white shadow-md rounded px-8 pt-6  transition-all duration-700 ease-in-out overflow-hidden ${
                    isFormOpen ? "max-h-screen opacity-100 pb-8 mb-4" : "max-h-0 opacity-0"
                }`}>
                    <h3 className="text-xl font-bold mb-4">Your Review</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Overall rating</label>
                            <div className="flex mt-1 text-yellow">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} onClick={() => setRating(star)}>
                                        {star <= rating ? (
                                            <FaStar className="h-8 w-8 cursor-pointer text-yellow-400" />
                                        ) : (
                                            <FaRegStar className="h-8 w-8 cursor-pointer text-gray-300" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Add a headline</label>
                            <input
                                id="title"
                                placeholder="What's most important to know?"
                                maxLength={50}

                                {...register("title", { required: "This field is required" })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="post" className="block text-gray-700 text-sm font-bold mb-2">Add a written review</label>
                            <textarea
                                id="post"
                                maxLength={360}
                                placeholder="What did you like or dislike? What did you use this product for?"
                                {...register("post", 
                                    {   required: "This field is required",
                                    })}

                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 ${errors.post ? 'border-red-500' : ''}`}
                            />
                            {errors.post && <p className="text-red-500 text-xs italic">{errors.post.message}</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </form>
                </div>
        </>
    );
};

export default CommentBox;


