import { FaEye, FaSyncAlt, FaHeart } from 'react-icons/fa';
import useSesion from '../../store/useSesion';
import { NavLink } from 'react-router-dom';
import useMutationPostCart from '../../hooks/cart/useMutationPostCart';
import useMutationPostWhishlist from '../../hooks/whishlist/useMutationPostWhishlist';
import useMutationDeleteWhishlist from '../../hooks/whishlist/useMutationDeleteWhishlist';
import useAutenticacion from '../../store/useAutenticacion';
import { useEffect, useState } from 'react';

export const Products = ({ product }) => {
    const { id_producto, name_producto, precio, id_whishlist, imagen } = product;

    const url = `/productDetails/${id_producto}/`;
    const usuario = useSesion();
    const addToCart = useMutationPostCart();
    const addToWhishlist = useMutationPostWhishlist();
    const deleteToWhishlist = useMutationDeleteWhishlist();
    const { setShowLogin } = useAutenticacion();
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

    const handleAddToCart = () => {
        if (usuario.isLoggedIn) {
            addToCart.mutate({
                producto: id_producto,
                cantidad_del_producto: 1
            });
        } else {
            setShowLogin(true);
        }
    };

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

    return (
        <div className={`flex  flex-col mx-auto sm:mx-0  rounded-2xl shadow-lg ${addToCart.isPending && "opacity-40 pointer-events-none"}`}>
            <div className='overflow-hidden'>
                <div className='inline group relative'>
                    <span className='z-10 absolute top-0 right-0 p-2 bg-yellow rounded-tr-md text-white'>
                        Sale
                    </span>
                    <div className='w-full h-full'>
                        <img src={imagen} className="object-cover rounded-t-md w-[300px] h-[240px] md:h-[170px] lg:h-[200px] xl:h-[250px]" alt="Image" />
                    </div>
                    <div className='absolute rounded-t-md bg-black bg-opacity-70 w-full h-full top-0 animate-move-up group-hover:animate-move-down'>
                        <button className='z-20 absolute bottom-0 p-3 text-white bg-yellow hover:bg-black' onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <ul className='absolute bg-yellow text-white text-xl bottom-0 right-0'>
                            <li className='hover:bg-black w-8 h-8 flex justify-center items-center'>
                                <NavLink to={url}><FaEye /></NavLink>
                            </li>
                            <li className='hover:bg-black w-8 h-8 flex justify-center items-center cursor-pointer' onClick={handleWhishlist}>
                                <FaHeart className={`${colorWhishlist && "text-red-600"}`} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-full p-4 bg-[#f4f4f4] rounded-b-md flex justify-between">
                <h3 className='mb-3 font-bold'>{name_producto}</h3>
                <span className='p-1 bg-yellow text-white'>{precio}$</span>
            </div>
        </div>
    );
};
    

                         