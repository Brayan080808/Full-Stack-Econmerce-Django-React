import {FaEye,FaSyncAlt,FaHeart} from 'react-icons/fa'
import useMutationPostCart from '../../hooks/cart/useMutationPostCart'
import useMutationDeleteWhishlist from '../../hooks/whishlist/useMutationDeleteWhishlist'
import useMutationPostWhishlist from '../../hooks/whishlist/useMutationPostWhishlist'
import useSesion from '../../store/useSesion'
import useAutenticacion from '../../store/useAutenticacion'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'


export const ProductsInformation = ({product}) =>{

    const  { id_producto, name_producto, descripcion, precio, id_whishlist, imagen } = product 
    const url = `/productDetails/${id_producto}/`
    const usuario = useSesion()
    const addToCart = useMutationPostCart()
    const addToWhishlist = useMutationPostWhishlist()
    const deleteToWhishlist = useMutationDeleteWhishlist()
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
    
    return(
        
        <div className={` flex-col  sm:flex-row  flex sm:gap-2 ${addToCart.isPending && "opacity-40 pointer-events-none"}`}>
            <div className=' overflow-hidden '>
            <div className='inline group relative '>
                <span className='z-10 absolute top-0 right-0 p-2 bg-yellow  text-white'>
                    Sale
                </span>
              <img src={imagen} className=" object-cover w-full h-[300px] sm:w-[300px] sm:h-[240px] md:h-[170px] lg:h-[200px] xl:h-[250px] " alt="Image"/>
              <div className='absolute bg-black bg-opacity-70  w-full h-full top-0 translate-y-[-101%] group-hover:translate-y-0 duration-500'>
                      
                <button onClick={handleAddToCart} className='z-20 absolute bottom-0 p-3 text-white bg-yellow hover:bg-black'> Add to Cart</button>

                <ul className='absolute bg-yellow  text-white text-xl  bottom-0 right-0'>
                    <li className='hover:bg-black w-8 h-8 flex justify-center items-center'>
                      <NavLink to={url}>
                          <FaEye />
                      </NavLink>
                    </li>
                    <li className='hover:bg-black w-8 h-8 flex justify-center items-center' onClick={handleWhishlist} >
                      <button>
                        <FaHeart className={`${colorWhishlist && "text-red-600"} `}/>
                      </button>
                    </li>
                </ul>
              </div>
            </div>
              
              
            </div>

            <div className='w-full sm:w-[65vw] space-y-3 bg-lightGrey p-4 '>
                <h3 className='mb-3 text-2xl font-bold'>{name_producto}</h3>

                <span className='p-1 bg-yellow text-white text-xl font-bold'>{precio}$</span>
                
                <p className=' text-ms text-justify text-textgrey'>{descripcion}</p>
                <button onClick={handleAddToCart} className='bg-yellow text-white p-2 hover:bg-black'>Add to Cart</button>
            </div>
        </div>
    )
}