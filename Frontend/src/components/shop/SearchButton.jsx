import { FaSearch } from "react-icons/fa"
import { useFiltros } from '../../store/useFiltros.jsx'
import { useForm } from 'react-hook-form';


const SearchButton =({}) =>{
    const { register, handleSubmit, reset } = useForm();
    const usuario = useFiltros();

    const onSubmit = (data) =>{
        usuario.setAdvancedSearch(data.search)
        usuario.setPrecio__gte(0)
        usuario.setPrecio__lte(30)
        usuario.setOrdering(null)
        usuario.setCategoria_producto(null)
        usuario.setUrl()
        // reset()
    }

    return(
            <form className='flex' onSubmit={handleSubmit(onSubmit)}>
                <input            
                    placeholder='Search...'
                    type="text" 
                    id="search" 
                    {...register('search')}
                    className='w-full bg-[#333333] p-4 text-lightGrey '
                />

                <button className=' bg-black p-4 text-white hover:bg-yellow' type="submit">
                    <FaSearch />
                </button>
            </form>
    )
  }
export default SearchButton;