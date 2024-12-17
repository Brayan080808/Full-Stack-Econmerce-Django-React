import AddImg01 from '../../img/add-img-01.jpg'
import AddImg02 from '../../img/add-img-02.jpg'
import { NavLink } from 'react-router-dom'
const imgs = [AddImg01,AddImg02]

export const BoxAddProducts = ({data}) => {

    return(
        
        <div className="bg-lightGrey py-[8%] px-4">
            <div className='flex flex-wrap gap-6 justify-center'>
                {data.map((item,key) =>{
                    return(
                        <NavLink key={key} to={`/productDetails/${item.id_producto}/`}>
                            <img  src={imgs[key]} alt="" className=' hover:scale-105 transition-all'/>
                        </NavLink>

                    )
                })}
            </div>
        </div>

    )
}