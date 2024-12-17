import { FaTimes } from 'react-icons/fa'
import useMutationPostCart from '../../hooks/cart/useMutationPostCart'
import useMutationDeleteWhishlist from '../../hooks/whishlist/useMutationDeleteWhishlist'

const WhishlistElement = ({product}) => {
    const addToCart = useMutationPostCart()
    const deleteToWishlist = useMutationDeleteWhishlist()
    
    
    const handleSubmit = () =>{
        addToCart.mutate({
            "producto": product.producto,
            "cantidad_del_producto":1
          })
    } 
    

    return(
        <tr className={`p-6  border-b-2 border-lightGrey ${(addToCart.isPending || deleteToWishlist.isPending) && "bg-lightGrey opacity-20"}`}>
            <td className=' text-center flex justify-center items-center'>
                <div className='py-3'>
                    <img src={product.imagen} alt=""  className='w-24 h-24 object-cover '
                    />   
                </div>
     
            </td>
            <td className=' font-bold text-center'>{product.name_producto}</td>
            <td className='  text-center'> 
                ${product.precio}
                
            </td>
            <td className='text-center text-textgrey text-base sm:text-xl'>{true ? 'In stock':'No found'}</td>

            <td className='text-center text-textgrey'>
                <button onClick={handleSubmit} className='bg-yellow  font-bold text-white  py-3 px-1 sm:p-3 hover:bg-black transition-colors'>Add to Cart</button>
            </td>

            <td className=' '>
                <FaTimes className='m-auto hover:text-yellow cursor-pointer ' onClick={() => deleteToWishlist.mutate(product.id_whishlist)}/>
            </td>
        </tr>
    )
}
export default WhishlistElement;
