import { useEffect, useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import useMutationDeleteCart from '../../hooks/cart/useMutationDeleteCart.js'
import useMutationPatchCart from '../../hooks/cart/useMutationPatchCart.js'

const CartElement = ({product}) => {
    const [value, setValue] = useState(product.cantidad_del_producto);
    const url = `/shop/carro_compra/${product.id_carro_compra}/`
    
    const mutationDelete = useMutationDeleteCart()
    const mutationPatch = useMutationPatchCart()
    const handleOnChange = (event) => setValue(event.target.value);
    const handleOnBlur = () =>  mutationPatch.mutate({"id_carro_compra":product.id_carro_compra,value})

    useEffect(() => {
            setValue(product.cantidad_del_producto)
        },[product.cantidad_del_producto])

    return(
        
        <tr className={`p-6 border-b-2 border-lightGrey ${mutationDelete.isPending && "opacity-40 pointer-events-none"}`} >
            <td className='text-center flex justify-center items-center'>
                <div className='py-3 '>
                    <img src={product.imagen} alt=""  className='w-[4.5rem] h-[4.5rem]  sm:w-24 sm:h-24 object-cover '
                    />   
                </div>
            
            </td>
            <td className='  text-sm sm:text-base font-bold text-center'>{product.name_producto}</td>
            <td> 
                <input type='number' value={value} onChange={handleOnChange} onBlur={handleOnBlur} min={1} max={20} step={1} className=' border border-black text-center target:border-yellow focus:border-yellow w-full'/>
                
            </td>
            <td className='text-center text-textgrey'>${product.precio}</td>
            <td className='text-center text-textgrey'>${product.precio_total}</td>
            <td className=''>

                <div className='flex justify-center'>
                    <button onClick={() => mutationDelete.mutate(product.id_carro_compra)} >
                    <FaTimes className='m-auto hover:text-yellow'/>
                    </button>
                </div>
      
            </td>
        </tr>
    )
}
export default CartElement