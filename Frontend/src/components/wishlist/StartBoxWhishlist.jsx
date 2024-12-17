import useQueryWhishlist from '../../hooks/whishlist/useQueryWhishlist'
import Spiner from '../Spiner'
import EmptyWishlist from './EmptyWishlist'
import WhishlistElement from './WhishlistElement'
import ErrorState from '../ErrorState'


export const StartBoxWhishlist = () =>{
    const { isPending, isError, data, error, isSuccess, refetch } = useQueryWhishlist()

    if (isPending) return <Spiner />   
    if (isError) return <ErrorState refetch={refetch} />
    

    return (
        <div className="p-1 md:p-16 my-6">
            <table className='w-full'>
                <thead className=''>
                    <tr className="bg-yellow text-white text-sm  sm:text-lg ">
                        <th className='py-4 px-1 md:px-2'>Images</th>
                        <th className='py-4 px-1 md:px-2'>Name</th>
                        <th className='py-4 px-1 md:px-2'>Price</th>
                        <th className='py-4 px-1 md:px-2'>Stock</th>
                        <th className='py-4 px-1 md:px-2'>Add Item</th>
                        <th className='py-4 px-1 md:px-2'>Remove</th>
                    </tr>
                </thead>
                <tbody className=''>
                 {data.map((product,key) => 
                        <WhishlistElement product={product} key={key}/>
                    )}
                </tbody>            
            </table>
            {data.length === 0 && <EmptyWishlist />}
        </div>
    )
} 






