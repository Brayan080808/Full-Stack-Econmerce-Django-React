import { FaUser,FaHeadset,FaLocationArrow } from 'react-icons/fa' 
import useSesion from "../../store/useSesion";
import Logout from "../Logout";
import useAutenticacion from '../../store/useAutenticacion'
import { NavLink } from 'react-router-dom';
import SliderPromo from './SliderPromo';

const MainTop = () => {

    const usuario = useSesion()
    const { setShowLogin, setShowCreateAcount } = useAutenticacion()

    return(
        <>

        <div className='bg-black text-white  p-[0.625em] box-border flex  flex-col sm:flex-row justify-between' >
            
            <div>
                
                <div className='hidden ml:flex gap-2'  >
                    <div >
                        <select id="basic" className="bg-yellow cursor-pointer" data-placeholder="$ USD">
						    <option>¥ JPY</option>
						    <option>$ USD</option>
						    <option>€ EUR</option>
					    </select>
                    </div>

                    <div >
                    <p>Call US :- <a href="#" className=" hover:text-yellow"> +53 58683048</a></p>
                    </div>

                </div>

                <div className='m-2 ' >
                    <ul className="flex justify-center flex-wrap sm:justify-normal font-semibold">
                        <li className="mr-3 sticky-0 ">
                            <NavLink to='/next/version/' className="border-solid border-white border-r-[0.08rem] pr-1 flex gap-[0.30rem] hover:text-yellow "><FaUser className="my-auto"/> My Account</NavLink>
                        
                        </li>
                        <li className="mr-3 sticky-0">
                           <NavLink to="/aboutUs/" className="border-solid border-white border-r-[0.08rem] pr-1 flex gap-[0.30rem] hover:text-yellow "><FaLocationArrow className="my-auto"/> Our location</NavLink>
                        </li>
                        <li className="mr-3 sticky-0">
                            <NavLink to="/contactUs/" className="border-solid border-white border-r-[0.08rem] pr-1 flex gap-[0.30rem] hover:text-yellow "><FaHeadset className="my-auto"/>Contact Us</NavLink>
                        </li>
                    </ul>
                </div>

            </div>
            
            <div className="hidden sm:flex  items-center ">
                    
                    <SliderPromo />
            </div>

            


            <div className="mx-auto sm:mx-0 flex gap-2 justify-center items-center ">         
                {!usuario.isLoggedIn ? <>
                
                    <div className=" bg-yellow  cursor-pointer p-[0.4rem] hover:scale-105">
                        <button onClick={() => setShowCreateAcount(true)}>Register Here</button>
                    </div>

                    <div className=" bg-yellow  cursor-pointer p-[0.4rem] hover:scale-105">
                        <button onClick={() => setShowLogin(true)}>Sign In</button>
                    </div>

                    </>:

                    <Logout/>
 
                }
            </div>
        </div>
    </>
    )
}
export default MainTop






    