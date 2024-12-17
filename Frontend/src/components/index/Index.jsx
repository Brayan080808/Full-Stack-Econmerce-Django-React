import {SlidesShop} from './SlidesShop.jsx'
import {StartCategories} from './StartCategories.jsx'
import {BoxAddProducts} from './BoxAddProducts.jsx'
import {StartBlog} from './StartBlog.jsx'
import { useQuery } from '@tanstack/react-query'
import Spiner from '../Spiner.jsx'
import IndexError from './IndexError.jsx'
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated.js'

const Index = () => {
    const token = ApiServerAuthenticated()
    const { isPending, isError, error, data} = useQuery({
        queryKey: ['productsIndex'], 
        queryFn: () => token.get('/api/index/'),
        
        refetchOnWindowFocus: false
    })


    if(isPending) return <Spiner />
    if(isError) return <IndexError />
    

    
    return(
        <>
            <SlidesShop />
            <StartCategories data={data.data.slice(0,3)}/>
            <BoxAddProducts data={data.data.slice(3,5)}/>
            <StartBlog data={data.data.slice(5,8)}/>
        </>
    )
}
export default Index