import {Products} from '../shop/Products.jsx'
import {ProductsInformation} from '../shop/ProductsInformation.jsx'
import { useFetchProducts } from '../../hooks/useFetchProducts.js';
import { useFiltros } from '../../store/useFiltros.jsx'
import NoSearchResults from './NoSearchResults.jsx';
import Spiner from '../Spiner.jsx'
import { toast } from 'sonner';

import ErrorState from '../ErrorState.jsx';



export const ProductCategorieBox = ({productInformation}) =>{
  
  const toggleDropdown = (status) => {
      return status===true ?' animate-fade-out hidden':' animate-fade-in ';
  }

  const { url } = useFiltros()

  const { isPending, isError, error, products, data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError } = useFetchProducts(url)  

    if (isPending){return <Spiner />}    
    if (isError){return <ErrorState refetch={refetch}/>}
    


    isFetchNextPageError && toast.error("Error al cargar los resultados")
  
    return (
      <>
        <div className = 'relative  p-2 '>
          <div className = {`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 ${toggleDropdown(productInformation)} `}>
            {
              products.map((item) => 
              <Products 
              key={item.id_producto}
              product={item}
              />) 
            }
            
            
         </div>
        
          {isFetchingNextPage && <Spiner />}

         

        <div className={`flex flex-col gap-4 relative top-0 ${toggleDropdown(!productInformation)}`}>
            {
              products?.map((item) => 
              <ProductsInformation
              key = {item.id_producto} 
              product={item}
              />) 
            }
        </div>
        {products.length === 0 && <NoSearchResults />}

        {hasNextPage && !isFetchingNextPage && 
                <button onClick={fetchNextPage} className="mt-4 p-2 m-2 bg-yellow text-white rounded hover:bg-black transition">
                    Cargar más productos...
                </button>
            }
        </div>
      </>
    )
  }



