import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ApiServerAuthenticated from '../../services/ApiServerAuthenticated';

const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));


function useQueryComment(){
    const { id } = useParams()
    const token = ApiServerAuthenticated()



    
    
    const {isPending, isError, data, error, refetch, fetchNextPage, hasNextPage ,isFetchingNextPage ,isFetchNextPageError} = useInfiniteQuery({
        queryKey: ['comments',id], 
        initialPageParam: `/comentarios/${id}/`,
        queryFn: (pageParam) => token.get(pageParam.pageParam).then((response) => response.data),
        getNextPageParam: (lastPage) => lastPage.next,
        refetchOnWindowFocus: false,

    
    })
        

    return {
        isPending, 
        isError,
        error, 
        data,
        hasNextPage,
        refetch,
        fetchNextPage,
        results: data?.pages.flatMap(page => page.results) ?? [],
        count: data?.pages[0].count,
        ratingAvg: data?.pages[0].ratingAvg,
        distributionRating: data?.pages[0].distribution_rating,
        isFetchingNextPage,
        isFetchNextPageError,
        
    }
} 
export default useQueryComment