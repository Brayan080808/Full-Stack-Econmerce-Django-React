import {SelectElement} from '../shop/SelectElement.jsx'
import SearchButton from './SearchButton.jsx'
import { useFiltros } from '../../store/useFiltros.jsx'
import MultiRangeSlider from '../MultiRangeSlider.jsx'



export const FilterSidebarLeft = () =>{

   
    const {setCategoria_producto,categoria_producto,setUrl,url,setPrecio__gte,setPrecio__lte}= useFiltros()

    return(
        <div className='w-full '>

          <SearchButton />

          <div >
            <h3 className='py-4 mb-2 border-b-2 border-black text-lg  '>Categories</h3>    
              <SelectElement options={['All','Frutas','Verduras','Tubérculos','Legumbres']} filtro={categoria_producto} setFiltro={setCategoria_producto} setUrl={setUrl} />
          </div>

        <div>
          <h3 className='py-4 mb-2 border-b-2 border-black text-lg'>Price</h3>
          <div className='p-2'>

            <MultiRangeSlider min={0} max={30} setPrecio__gte={setPrecio__gte} setPrecio__lte={setPrecio__lte} setUrl={setUrl}/>

          </div>
        </div>

        
          
        

      </div>
    )
}

