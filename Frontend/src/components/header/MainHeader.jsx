import { useState, useEffect, useRef } from 'react'
import Logo from '../../img/logo.png'
import { FaSearch,FaBars } from 'react-icons/fa'
import { StartTopSearch } from './StartTopSearch'
import { NavLink,useNavigate } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti";
import useSesion from '../../store/useSesion'
import useAutenticacion from '../../store/useAutenticacion'




const MainHeader = () => {
    const [Dropdown, setDropdown] = useState(false);
    const [BarSearch, setBarSearch] = useState(false);
    const usuario = useSesion();
    const navigate = useNavigate();
    const { setShowLogin } = useAutenticacion();
    const dropdownRef = useRef(null);
    const dropdownRefButton = useRef(null);
    const dropdownRefSearchButton = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                dropdownRefButton.current && !dropdownRefButton.current.contains(event.target)
            ) {
                setDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuClick = () => {
        setDropdown(false);
    };

    const handleCartButton = () => {
        usuario.isLoggedIn ? navigate('/cart/') : setShowLogin(true);
    };

    const handleWhishlistButton = () => {
        setDropdown(false);
        usuario.isLoggedIn ? navigate('/whishlist/') : setShowLogin(true);
    };

    const toggleDropdown = (status) => {
        return status ? 'animate-move-down' : 'animate-move-up pointer-events-none';
    };

    return (
        <>
            {/* sticky top-0 */}
            <header className=' z-20 shadow-2xl '>
                <div className='grid grid-cols-3 ml:grid-cols-7 z-20 text-black py-1 bg-lightGrey relative whitespace-nowrap'>
                    {/* Botón de Barras para el menú desplegable */}
                    <div className='m-auto ml:hidden ' ref={dropdownRefButton}>
                        <button className="border border-yellow p-2" type="button" onClick={() => setDropdown(!Dropdown)}>
                            <FaBars className=' text-[1.33rem]' />
                        </button>
                    </div>
                    {/* Logo de la tienda */}
                    <div className=' ml:col-start-1 ml:col-end-3 '>
                        <NavLink to="/" className='w-full'>
                            <img src={Logo} alt="Logo de la tienda" className='mx-auto' />
                        </NavLink>
                    </div>
                    {/* Botón de búsqueda y de carro de compra */}
                    <div className='m-auto'>
                        <ul className='flex'>
                            <li className="my-auto hover:text-yellow ">
                                <button ref={dropdownRefSearchButton} onClick={() => setBarSearch(!BarSearch)}>
                                    <FaSearch className="text-2xl cursor-pointer" />
                                </button>
                            </li>
                            <li className="relative p-3 hover:text-yellow cursor-pointer">
                                <button onClick={handleCartButton} className='flex'>
                                    
                                    { (usuario.countCart > 0 ) && <span className="absolute right-0 top-0 w-5 h-5 rounded-full bg-yellow flex justify-center items-center text-xs text-white">{ usuario.countCart > 9 ? "9+" : usuario.countCart }</span>
                                    }
                                    
                                    <TiShoppingCart className="text-5xl" />
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* Barra de navegación */}
                    <nav className='h-[13.7rem] col-span-3 overflow-hidden absolute top-full left-0 right-0 pointer-events-none ml:h-auto ml:relative ml:top-auto 
                    ml:col-span-4 ml:col-start-3 ml:row-start-1 ml:my-auto ml:mr-10 ml:text-xl '>
                        <div ref={dropdownRef} className={`${toggleDropdown(Dropdown)} w-full pb-6 bg-lightGrey absolute ml:relative ml:animate-move-down ml:pb-0 pointer-events-auto ml:flex ml:justify-center`}>
                            
                            <ul className="px-20 ml:px-0 ml:flex ml:gap-10 font-semibold ">
                                <li className="border-b-2 ml:border-none hover:text-yellow cursor-pointer pt-2 pb-2">
                                    <NavLink to="/" onClick={handleMenuClick}>Home</NavLink>
                                </li>
                                <li className="border-b-2 ml:border-none hover:text-yellow cursor-pointer pt-2 pb-2">
                                    <NavLink to="/aboutUs" onClick={handleMenuClick}>About Us</NavLink>
                                </li>
                                <li className="border-b-2 ml:border-none hover:text-yellow cursor-pointer pt-2 pb-2">
                                    <NavLink to="/shop" onClick={handleMenuClick}>Shop</NavLink>
                                </li>
                                <li className="border-b-2 ml:border-none hover:text-yellow cursor-pointer pt-2 pb-2" >
                                    <button onClick={handleWhishlistButton}>
                                        Whishlist
                                    </button>   
                                </li>
                                <li className="border-b-2 ml:border-none hover:text-yellow cursor-pointer pt-2 pb-2">
                                    <NavLink to="/contactUs" onClick={handleMenuClick}>Contact Us</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <StartTopSearch setBarSearch={setBarSearch} BarSearch={BarSearch} dropdownRefSearchButton={dropdownRefSearchButton}/>
            </header>
        </>
    );
};
export default MainHeader;








