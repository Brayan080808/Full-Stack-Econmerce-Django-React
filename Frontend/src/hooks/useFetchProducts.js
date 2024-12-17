import { useInfiniteQuery } from '@tanstack/react-query'
import ApiServerAuthenticated from '../services/ApiServerAuthenticated'
import { toast } from 'sonner'


export function useFetchProducts(url){
    const token = ApiServerAuthenticated()

    const {isPending, isError, data, error, refetch, fetchNextPage, hasNextPage , isFetchingNextPage , isFetchNextPageError} = useInfiniteQuery({
        queryKey: ['products',url], 
        initialPageParam: url,
        
        queryFn: ({pageParam}) => token.get(pageParam).then((response) => response.data),
        getNextPageParam: (lastPage) => lastPage.next,

        refetchOnWindowFocus: false,
        

        onError: () => {
            toast.error('Ocurrio un error inesperado')
        },  
    }
        
    )

    return {
        isPending, 
        isError,
        error, 
        data,
        product: data?.pages[0],
        refetch,
        count:data?.pages[0].count,
        products: data?.pages.flatMap(page => page.results) ?? [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetchNextPageError,
    }
} 