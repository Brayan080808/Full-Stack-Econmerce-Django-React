import {Product} from './Product.jsx'
import {ProductReviews} from './ProductReviews.jsx'    
import StartAllTitleBox from '../StartAllTitleBox.jsx'
import { useParams } from 'react-router-dom'
import Spiner from '../Spiner.jsx'
import { useFetchProducts } from '../../hooks/useFetchProducts.js'
import ErrorState from '../ErrorState.jsx'


const ProducDetails = () => {

    const { id } = useParams();
    const url = `/api/shop/${id}/`;
    
    const {isPending, isError, error, data, product, refetch} = useFetchProducts(url)

    if (isPending) return <Spiner />
    if (isError) return(
                    <div className='w-screen h-screen flex justify-center pt-10'>
                        <ErrorState refetch={refetch} />
                    </div>
                )


    return(
        <>
            <StartAllTitleBox page={"Detalles"}/>

            {<Product

                name_producto = {product.name_producto} 
                descripcion = {product.descripcion} 
                precio = {product.precio}
                valoracion = {product.valoracion}
                cantidad_disponible = {product.cantidad_disponible}
                categoria_producto = {product.categoria_producto}
                proovedor = {product.proovedor}
                id_whishlist = {product.id_whishlist}
                imagen = {product.imagen}
                id_producto = {product.id_producto}
              
            />}

            <ProductReviews />
        </>
    )
}
export default ProducDetails