import {FaEnvelope,FaFacebook,FaTwitter,FaLinkedin,FaGooglePlus,FaRss,FaPinterest,FaWhatsapp,FaMapMarkerAlt,FaPhoneSquare} from 'react-icons/fa'
import { LuLink } from "react-icons/lu";


export const StartFooter =()=>{
    return(
        <footer>
            <div className="bg-black  grid  grid-cols-1 sm:grid-cols-3 p-4 sm:p-16  text-white">
                   
                    <FooterElementRow1 sesion={'Business Time'}>
                        
							<ul className="list-time">
								<li>Abierto de lunes a domingo</li>
                                <li>24h</li> 
							</ul>

                    </FooterElementRow1>

                    <FooterElementRow1 sesion={'Newsletter'}>
							<form className=" ">
								<div className="relative mb-3">
									<input className="p-3 w-full rounded-sm text-black" type="email" name="Email" placeholder="Email Address*" />
                                    <div className='absolute right-3 top-0 h-full  flex items-center '>
									<FaEnvelope className='text-2xl'/>
                                    </div>
								</div>

                                <div className='bg-yellow border border-yellow hover:bg-black text-white p-2 inline-block rounded-sm'>
								    <button className="" type="submit">Submit</button>
                                </div>
							</form>
						
					</FooterElementRow1>

                    <FooterElementRow1 sesion={'Social Media'}>

							<ul className='flex gap-2 mt-2 text-white text-xl'>
                                <li className=' p-[0.35rem] border-white border-2 hover:border-yellow hover:text-yellow transition-colors'><a href="#"><FaLinkedin /></a></li>
                                <li className=' p-[0.35rem] border-white border-2 hover:border-yellow hover:text-yellow transition-colors'><a href="#"><FaGooglePlus /></a></li>
                                <li className=' p-[0.35rem] border-white border-2 hover:border-yellow hover:text-yellow transition-colors'><a href="#"><FaWhatsapp /></a></li>
                                
                            </ul>
						
					</FooterElementRow1>
                
                    <FooterElementRow2 sesion={'About Freshshop'}>
                        
                            
                            <p className='text-justify leading-snug mb-2'>Este proyecto de comercio electrónico fue creado para demostrar las habilidades técnicas de su desarrollador. Construido con React y Tailwind CSS, la tienda virtual tiene como objetivo mostrar la capacidad de crear una plataforma de e-commerce moderna y funcional.

                            La tienda cuenta con una amplia gama de productos, un sistema de carrito de compras, un proceso de pago seguro y un módulo de gestión de inventario. El diseño receptivo y visualmente elegante, gracias a Tailwind CSS, ofrece a los usuarios una experiencia de navegación optimizada.

                            Aunque no es una tienda real, este proyecto sirve como un escaparate para demostrar las habilidades del desarrollador en el campo del comercio electrónico, incluyendo la conceptualización, diseño y construcción de una plataforma de e-commerce completa.</p> 							
                        
                    </FooterElementRow2>

                    <FooterElementRow2 sesion={'Information'}>
                    
                            <ul>
                                <li className='flex gap-2 hover:text-yellow hover:translate-x-2 transition-all'><LuLink  className='my-auto'/><a href="#">About Us</a></li>
                                <li className='flex gap-2 hover:text-yellow hover:translate-x-2 transition-all'><LuLink  className='my-auto'/><a href="#">Customer Service</a></li>
                                <li className='flex gap-2 hover:text-yellow hover:translate-x-2 transition-all'><LuLink  className='my-auto'/><a href="#">Our Sitemap</a></li>
                                <li className='flex gap-2 hover:text-yellow hover:translate-x-2 transition-all'><LuLink  className='my-auto'/><a href="#">Terms &amp; Conditions</a></li>
                                <li className='flex gap-2 hover:text-yellow hover:translate-x-2 transition-all'><LuLink  className='my-auto'/><a href="#">Privacy Policy</a></li>
                                <li className='flex gap-2 hover:text-yellow hover:translate-x-2 transition-all'><LuLink  className='my-auto'/><a href="#">Delivery Information</a></li>
                            </ul>
                        
                    </FooterElementRow2>

                    <FooterElementRow2 sesion={'Contact Us'}>
                        
                            <ul>
                                <li>
                                    <p className='flex gap-2'><FaMapMarkerAlt className='my-1'/>Address: Carretera San Antonio de los baños <br /> Rpt. Torrens, La Habana </p>

                                </li>
                                <li>
                                    <p className='flex gap-2' ><FaPhoneSquare className='my-auto'/>Phone: <a href="tel:+53 58683048" className='hover:text-yellow'>+53 58683048</a></p>

                                </li>
                                <li>
                                    <p className='flex gap-2'><FaEnvelope className='my-auto'/>Email: <a href="mailto:bryanayalaacosta@gmail.com" className='hover:text-yellow'>bryanayalaacosta@gmail.com</a></p>

                                </li>
                            </ul>
                        
                    </FooterElementRow2>

            </div>
        </footer>
    )
}

const FooterElementRow1 = ({sesion,children}) =>{
    return (
        <div className="p-5 text-textgrey border-b-2 border-textgrey ">
            <h3 className="border-b-2 border-yellow text-white text-xl py-2 mb-2">{sesion}</h3>

            {children}
        </div>
    )
} 

const FooterElementRow2 = ({sesion,children}) =>{
    return (
        <div className="p-5 text-textgrey ">
            <h4 className="border-b-2 border-yellow  text-white text-xl py-2 mb-2">{sesion}</h4>
            {children}
        </div>
    )
} 