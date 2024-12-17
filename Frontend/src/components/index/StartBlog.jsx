import BlogImg from '../../img/blog-img.jpg'
import BlogImg01 from '../../img/blog-img-01.jpg'
import BlogImg02 from '../../img/blog-img-02.jpg'
import { FaHeart } from "react-icons/fa6";
import { FaRegEye,FaRegComments } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useSesion from '../../store/useSesion';
import useMutationDeleteWhishlist from '../../hooks/whishlist/useMutationDeleteWhishlist';
import useMutationPostWhishlist from '../../hooks/whishlist/useMutationPostWhishlist';
import useAutenticacion from '../../store/useAutenticacion';

const imgs = [BlogImg01,BlogImg,BlogImg02]

export const StartBlog = ({data}) => {

    return(
        <div className='p-4 bg-lightGrey flex flex-col items-center pb-10 gap-7 justify-center'>
            
                <h2 className='text-4xl font-bold'> latest blog</h2>
                <p className=' text-textgrey'>Lee mas acerca de nuestros productos mas demandados</p>

                <div className='flex flex-wrap gap-6'>
                    {data.map((item,key) => {
                        return(
                            <StartBlogCart key={key} image={imgs[key]} parraf={item.descripcion} title={item.name_producto} id_producto={item.id_producto} id_whishlist={item.id_whishlist}/>
                        )
                    })}
                </div>
        </div>
    )
} 

const StartBlogCart = ({image, parraf, title, id_producto, id_whishlist}) =>{
    const usuario = useSesion()
    const { setShowLogin } = useAutenticacion()
    const deleteToWhishlist = useMutationDeleteWhishlist()
    const addToWhishlist = useMutationPostWhishlist()

    const [changeWhishlist, setChangeWhishlist] = useState(null);
    const [colorWhishlist, setColorWhishlist] = useState(null);


    useEffect(() => {
        if(addToWhishlist.isError || deleteToWhishlist.isError){
            setColorWhishlist(!colorWhishlist)
        }

    },[addToWhishlist.isError,deleteToWhishlist.isError])

    useEffect(() => {
        if (addToWhishlist.isSuccess) {
            setChangeWhishlist(addToWhishlist.data.data.id_whishlist);
        }
    }, [addToWhishlist.isPending]);

    useEffect(() => {
        if (id_whishlist) {
            setChangeWhishlist(id_whishlist);
            setColorWhishlist(true);
        } else {
            setChangeWhishlist(null);
        }
    }, []);


    const handleWhishlist = () => {
        if (usuario.isLoggedIn) {
            if (colorWhishlist) {
                deleteToWhishlist.mutate(changeWhishlist);
            } else {
                addToWhishlist.mutate({ producto: id_producto });
            }
            setColorWhishlist(!colorWhishlist);

        } else {
            setShowLogin(true);
        }
    };

    return(
        
    <div className="flex bg-white rounded-lg transition-all relative">
        
        <div className='w-[90vw] sm:w-[45vw] ml:w-[30vw]  sm:shadow-2xl rounded-lg  flex flex-col '>
            <img src={image} alt=""  className=' rounded-t-md '/>
            <div className='pb-4 h-[80%]  pt-10 px-6 '>
                <h3 className=' font-bold text-xl'>{title}</h3>
                <p className='mt-3 '>
                    {parraf}
                </p>
            </div>

            <div className=' w-full flex justify-center mb-3 text-white text-2xl '>
                <div className='w-10 h-10 flex justify-center gap-1 m-auto'>
                    <button onClick={handleWhishlist} className={` p-2 bg-black hover:bg-yellow transition-all `}>
                        <FaHeart className={`${colorWhishlist && "text-red-600 "}`}/>
                    </button>
                    <NavLink to={`/productDetails/${id_producto}/`} className=' p-2 bg-black hover:bg-yellow transition-all'>
                        <FaRegEye />
                    </NavLink>
                    <NavLink to={`/productDetails/${id_producto}/`} className=' p-2 bg-black hover:bg-yellow transition-all'>
                        <FaRegComments />
                    </NavLink>
                </div>
            </div>
        </div>
    </div>
    )
}