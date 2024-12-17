import Comment from './Comment';
import useSesion from '../../store/useSesion.jsx';
import CommentBox from './CommentBox.jsx';
import useQueryComment from '../../hooks/comment/useQueryComment.js';
import useMutationPostComments from '../../hooks/comment/useMutationPostComments.js';
import Rating from './Rating.jsx';
import Spiner from '../Spiner.jsx';
import { toast } from 'sonner';
import NoComments from './NoComments.jsx';
import ErrorState from '../ErrorState.jsx';


export const ProductReviews = () => {
    const usuario = useSesion();


    const { isPending, isError, error, data, refetch, results, count, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError, ratingAvg, distributionRating } = useQueryComment();
    let issError=true

    const mutatePost = useMutationPostComments();

    if (isPending) return <Spiner />;
    if (isError) return <ErrorState refetch={refetch} />;
    if (isFetchNextPageError) toast.error('Error al cargar los comentarios');


    return(
        <section className=' mx-auto mb-14 p-2 sm:p-14'>
          
    
    <hr className="my-8 border-t border-gray-300" />
    
    <div className="mt-12  ">
      


      <div className=' lg:flex lg:justify-between gap-16 '>

            <div className='lg:sticky lg:top-6 lg:h-full bg-white z-[20]'>
              <h2 className="text-2xl font-bold mb-4 ">Customer Reviews</h2>

              <Rating count={count} ratingAvg={ratingAvg} distributionRating={distributionRating} />
            </div>

        <div className="space-y-8 lg:w-[65%]">
        <CommentBox mutate={mutatePost.mutate}/>

        {results.length === 0 && <NoComments/>}

                     
       
        {results.map((item) => (
            <Comment
                key={item.id_comentario}
                id_comentario={item.id_comentario}
                post={item.post}
                date={item.date}
                rating={item.rating}
                title={item.title}
                username={item.username}
                imagen={item.imagen}
                descripcion={item.descripcion}
                fromUser={usuario.user?.username === item.username}
                helpful_count={item.helpful_count} 
                helpful_to_user={item.helpful_to_user}
                
                
            />
        ))}
        {isFetchingNextPage && <Spiner />}

        {hasNextPage && !isFetchingNextPage && (
          <button 
            onClick={fetchNextPage}
            className="mt-4 w-full bg-yellow text-white hover:opacity-90 font-bold py-2 px-4 rounded"
          >
            Read more reviews
          </button>
        )}
        
        </div>
        </div>
    </div>
        
        </section>
      )
    
};


  