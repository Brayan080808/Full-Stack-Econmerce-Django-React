import React,{useState} from 'react';
import {ProductItemFilter} from '../shop/ProductItemFilter.jsx'
import {FilterSidebarLeft} from '../shop/FilterSidebarLeft.jsx'
import {ProductCategorieBox} from '../shop/ProductCategorieBox.jsx'

export const ShopBoxInner = () =>{
    const [productInformation,setProductInformation] = useState(false)


    return(
      <div className='p-3 sm:p-10 grid grid-cols-1 md:grid-cols-4 gap-3 '>
 
          {/* barra de busqueda y filtros */}
          <div className='md:col-start-4'>
            <FilterSidebarLeft   />
          </div>

          <div className='w-full flex flex-col gap-4 md:col-span-3 md:col-start-1 md:row-start-1'>
            {/* ordenamiento y cambiar vista */}
            <ProductItemFilter  productInformation={productInformation} setProductInformation={setProductInformation}/>
              

            {/* Los productos de la tienda */}
            <ProductCategorieBox  productInformation={productInformation} />

          </div>
      </div>            
    )
}




