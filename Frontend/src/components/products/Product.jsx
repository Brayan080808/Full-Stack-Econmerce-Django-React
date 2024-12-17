import bigImg01 from '../../img/big-img-01.jpg'
import bigImg03 from '../../img/big-img-03.jpg'
import { FaHeart,FaFacebook,FaTwitter,FaLinkedin,FaPinterest,FaWhatsapp} from 'react-icons/fa'
import useMutationPostCart from '../../hooks/cart/useMutationPostCart'

import { useState, useEffect } from 'react'
import { ProductImgs } from './ProductImgs';
import useMutationDeleteWhishlist from '../../hooks/whishlist/useMutationDeleteWhishlist'
import useMutationPostWhishlist from '../../hooks/whishlist/useMutationPostWhishlist'
import useSesion from '../../store/useSesion'
import useAutenticacion from '../../store/useAutenticacion'


export const Product = ({name_producto, descripcion, precio, valoracion, cantidad_disponible, categoria_producto, proovedor, id_whishlist, imagen, id_producto}) => {

    const [value, setValue] = useState(1);
    const usuario = useSesion()
    const addToCart = useMutationPostCart()
    const addToWhishlist = useMutationPostWhishlist()
    const deleteToWhishlist = useMutationDeleteWhishlist()
    const [changeWhishlist, setChangeWhishlist] = useState(null);
    const [colorWhishlist, setColorWhishlist] = useState(null);
    const { setShowLogin } = useAutenticacion()


    const handleOnChange = (event) => {
        setValue(event.target.value);  
    };

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
        <>
        <div className="grid grid-cols-1 mt-14 py-10  sm:grid-cols-2 sm:px-8 ml:pl-0 gap-10 sm:gap-0" >
            
            <ProductImgs imgs={[imagen,bigImg01,bigImg03]} />
            

            <div className='w-[85%] sm:w-full mx-auto flex flex-col gap-4 mt-3'>
                <h2 className=' font-bold text-2xl'>{name_producto}</h2>
                 <span className='font-semibold text-yellow text-lg'>${precio}</span>
                 <p className='text-[#666666]'>More than 20 avalible / 
                    <span className='text-yellow pl-1'>8 sold</span>
                </p> 

                 

                <h3 className=' font-bold'>Short Description:</h3>

                <p className='text-[#666666]'> {descripcion}</p>

                <div className='  border-black border border-dashed py-3 px-4 text-[#666666] text-md flex flex-col gap-2' >
                    <span >Quantity</span>
                    <div>
                        <input value={value} min={1} max={20} onChange={handleOnChange} type="number" className='border border-black p-3'/>
                    </div>
                </div>

                <div className='flex gap-3'>
                 
                    <button onClick={handleAddToCart} className='bg-yellow p-3 text-white font-semibold text-lg hover:bg-black transition'>Add to cart</button>
                    <button className='bg-yellow p-3 text-white font-semibold text-lg   hover:bg-black transition flex gap-1' onClick={handleWhishlist}>
                        <FaHeart className={` m-auto ${colorWhishlist && "text-red-600"}`} />
                        
                        {colorWhishlist ? "Remove to wishlist":"Add to wishlist"}
                        
                    </button>
                </div>

                <div className='flex gap-1'>
                    <a href="" className='bg-yellow text-white p-2 hover:bg-black transition'><FaFacebook className='text-lg'/></a>
                    <a href="" className='bg-yellow text-white p-2 hover:bg-black transition'><FaLinkedin className='text-lg'/></a>
                    <a href="" className='bg-yellow text-white p-2 hover:bg-black transition'><FaTwitter className='text-lg'/></a>
                    <a href="" className='bg-yellow text-white p-2 hover:bg-black transition'><FaPinterest className='text-lg'/></a>
                    <a href="" className='bg-yellow text-white p-2 hover:bg-black transition'><FaWhatsapp className='text-lg'/></a>
                </div>
            </div>
        </div>
        </>
    )
}