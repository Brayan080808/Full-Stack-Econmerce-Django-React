import { FaTh,FaListUl } from 'react-icons/fa'
import {SelectElement} from '../shop/SelectElement.jsx'
import { useFiltros } from '../../store/useFiltros.jsx'

import { useFetchProducts } from '../../hooks/useFetchProducts.js'

export const ProductItemFilter = ({setProductInformation,productInformation}) =>{
    
  function toggle(status){
    return status===true ?' text-black':' bg-yellow text-white';
}

  const [setOrdering,ordering,setUrl,url] = useFiltros((state) => [state.setOrdering,state.ordering,state.setUrl,state.url])

  

  const { count=0 } = useFetchProducts(url)  

  
    

  return(
    <div className=' border-y-[1px] p-1 border-black flex flex-wrap justify-between '>
      <div className='flex  gap-6'>
        <label className=' flex-shrink-0 my-auto'>Sort by</label>
        <SelectElement options={['Nothing','High Price--> Low Price','Low Price --> High Price']} filtro={ordering} setFiltro={setOrdering} setUrl={setUrl}/>
      </div>
    
      <p className='my-auto'>Showing all {count} results</p>

      <ul className='flex'>
        <li className=''>
            <button className={` w-12 h-12 ${toggle(productInformation)}`} onClick={()=> setProductInformation(false)}>
            <FaTh  className='text-2xl m-auto'/>
            </button>
        </li>

        <li className=''>
            <button className={` w-12 h-12 ${toggle(!productInformation)}`} onClick={()=> setProductInformation(true)}>
              <FaListUl  className='text-2xl m-auto'/>
            </button>
        </li>           
      </ul>
    </div>
)}



