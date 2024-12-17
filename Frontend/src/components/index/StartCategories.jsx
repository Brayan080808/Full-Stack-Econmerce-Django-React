import CategoriesImg01 from '../../img/categories_img_01.jpg'
import CategoriesImg02 from '../../img/categories_img_02.jpg'
import CategoriesImg03 from '../../img/categories_img_03.jpg'
import useMutationPostCart from '../../hooks/cart/useMutationPostCart'
import useSesion from '../../store/useSesion'
import { NavLink } from 'react-router-dom'
import useAutenticacion from '../../store/useAutenticacion'

const imgs = [CategoriesImg01,CategoriesImg02,CategoriesImg03]

export const StartCategories = ({data}) =>{

    return(
        
        <div className={` flex flex-wrap gap-5 justify-center my-20 text-white `}>


            {data.map((item,key) => {
                    return(

                        <StartCategoriesElement item={item} key={key} indice={key}/>

                    )
            })}
      </div>
       
    )
}

const StartCategoriesElement = ({item,indice}) => {

    const addToCart = useMutationPostCart()
    const usuario = useSesion()
    const { setShowLogin } = useAutenticacion()

    const handleAddToCart = (id_producto) => {
        if (usuario.isLoggedIn) {
            addToCart.mutate({
                producto: id_producto,
                cantidad_del_producto: 1
            });
        } else {
            setShowLogin(true);
        }
    };
    
    return(
    
        <div className={`${ addToCart.isPending && "opacity-60 pointer-events-none" } flex flex-col mx-8 sm:mx-0  items-center w-full sm:w-auto transition-all sm:shadow-2xl rounded-md `}>
            <NavLink to={`/productDetails/${item.id_producto}/`} className='overflow-hidden'>
                <img src={imgs[indice]} alt="" className=' object-fill w-full sm:w-[12rem] ml:w-[19rem] ml:h-[16rem] hover:scale-110 rounded-t-md '/>
            </NavLink>
            <button onClick={()=> handleAddToCart(item.id_producto)} className='bg-yellow hover:bg-black py-2 w-full sm:w-[12rem]  ml:w-[19rem] rounded-b-md' >
                <span>Sell</span>
            </button>
        </div>

    )
} 