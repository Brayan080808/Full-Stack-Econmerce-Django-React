import { MdDelete } from "react-icons/md";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import useMutationDeleteComments from '../../hooks/comment/useMutationDeleteComments'
import { useEffect, useState } from "react";
import useSesion from "../../store/useSesion";
import useAutenticacion from "../../store/useAutenticacion";
import ApiServerAuthenticated from "../../services/ApiServerAuthenticated";

const Comment = ({ post, rating, title, fromUser, id_comentario, username, imagen, date, helpful_to_user, helpful_count }) => {
    const mutationDelete = useMutationDeleteComments();
    const token = ApiServerAuthenticated()
    const [helpful,setHelpful] = useState()
    const [idHelpful,setIdHelpful] = useState(null)
    const [helpfulCount,setHelpfulCount] = useState(0)
    const usuario = useSesion()
    const { setShowLogin } = useAutenticacion()


    useEffect(()=>{
        setHelpfulCount(helpful_count)

        helpful_to_user ? (setHelpful(true), setIdHelpful(helpful_to_user) )
                        : (setHelpful(false))
    },[])

    
    
    const handleDeleteComment = () => {
        mutationDelete.mutate(id_comentario)
    }


    const handleHelpful = () => {
        if(usuario.isLoggedIn){
            if (helpful){
                token.delete(`/helpful/${idHelpful}/`).
                then(() => setIdHelpful(null))
                setHelpfulCount(helpfulCount-1)
            }
            else{
                token.post("/helpful/",{"comentario":id_comentario}).then((response) => setIdHelpful(response.data.id_helpful))
                setHelpfulCount(helpfulCount+1)
            }
            setHelpful(!helpful)
        }
        else{
            setShowLogin(true)
        }
    }
    
    return (
        <div className={`bg-white shadow-xl rounded-lg p-6 relative ${mutationDelete.isPending && 'opacity-60 pointer-events-none'}`}>
            <div className="flex items-center mb-4  ">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-600 mr-4 overflow-hidden">
                    <img src={imagen} alt="" className="w-full h-full object-cover"/>
                </div>
                

                <div>
                    <h4 className="text-lg font-bold">{username}</h4>
                    <div className="flex items-center">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                star <= rating ? (
                                    <FaStar key={star} className="h-5 w-5 text-yellow" />
                                ) : (
                                    <FaRegStar key={star} className="h-5 w-5 text-gray-300" />
                                )
                            ))}
                        </div>
                        <span className="ml-2 text-sm font-bold">{title}</span>
                    </div>
                </div>
            </div>
            <p className="mb-4 inline-block sm:mr-8 ">{post}</p>

            <div onClick={handleHelpful} className="flex items-center text-sm text-gray-500 ">
                <button className={`${helpful ? "  border-yellow text-yellow": "text-gray-800 border-gray-100"} border  flex items-center mr-4 bg-gray-100 hover:bg-gray-200  font-bold py-2 px-4 rounded`}>
                    <AiOutlineLike className="h-4 w-4 mr-2 " />
                    Helpful ({helpfulCount})
                </button>
                <span className='text-yellow'>Reviewed on {date}</span>
            </div>

            { fromUser && <div className=" flex items-center absolute right-1 sm:right-7 h-full top-0 ">
                <button onClick={handleDeleteComment} className=" text-3xl  text-yellow ">
                    <MdDelete/>
                </button>

            </div>}

        </div>
    );
};


export default Comment;

