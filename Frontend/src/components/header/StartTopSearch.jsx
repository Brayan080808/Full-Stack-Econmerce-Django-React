import { FaSearch,FaTimes} from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFiltros } from '../../store/useFiltros';
import { useRef, useEffect } from 'react';



export const StartTopSearch = ({ setBarSearch,BarSearch ,dropdownRefSearchButton }) => {
    const { register, handleSubmit, reset } = useForm();
    const {setAdvancedSearch,setUrl} = useFiltros();
    const navigate = useNavigate();
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
 
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && dropdownRefSearchButton.current && !dropdownRefSearchButton.current.contains(event.target)) {
                setBarSearch(false); // Cierra el menú al hacer clic fuera
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const onSubmit = (data) =>{
        setAdvancedSearch(data.search)
        setUrl()
        setBarSearch(false)
        navigate('/shop/')
        reset()
    }

    

    const toggleDropdown = (status) => {
        return status ? ' animate-move-down  ':' animate-move-up ';
    }

    return(
        <>
            <form ref={dropdownRef} onSubmit={handleSubmit(onSubmit)} className={`bg-black w-[100%] h-14 p-[0.625rem] flex justify-center gap-2 absolute ${toggleDropdown(BarSearch)}`} >
            
                <button type='submit'><FaSearch className='text-white my-2'/></button>
                
                <input      
                    placeholder="Search"
                    type="text" 
                    id="search" 
                    {...register('search')}
                    className="p-2 appearance-none bg-black w-[87%] text-white"
                    />

                <span onClick={() => setBarSearch(false)}><FaTimes className='text-white my-2  cursor-pointer'/></span>
            
            </form>
        </>
    )
}