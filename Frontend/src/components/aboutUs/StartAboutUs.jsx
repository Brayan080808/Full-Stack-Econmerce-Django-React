import AboutImg from '../../img/about-img.jpg'
export const StartAboutUs = () => {
    return(
        <div className="grid grid-cols-1 my-5 sm:my-10 md:my-20  mx-4 sm:mx-10 md:mx-28 md:grid-cols-2 p-2 gap-4 ">
            <div>
                <img src={AboutImg} alt="" className=' sm:col-span-1'/>
            </div>

            <div className='flex flex-col gap-3 sm:col-span-1'>
                <h2 className=' font-bold text-3xl'>WE ARE FRESHSHOP</h2>
                <p className=' text-base font-thin text-textgrey'>"Este sitio web de comercio electrónico es un proyecto de ejemplo creado para demostrar las habilidades técnicas de su desarrollador. Construido utilizando las tecnologías React y Tailwind CSS, el objetivo de este proyecto es mostrar la capacidad de crear una tienda virtual moderna, atractiva y funcional.

                El proyecto consiste en una tienda en línea con una amplia gama de productos, diseñada              para ofrecer a los visitantes una experiencia de compra fluida y agradable. Cuenta con un               sistema de carrito de compras integrado, un proceso de pago seguro y un módulo de gestión           de inventario, todo ello construido con las últimas tecnologías web.

                Además del sólido backend, el sitio web se destaca por su diseño receptivo y atractivo,                 creado con Tailwind CSS. Esta herramienta de diseño basada en utilidades permite lograr                 un aspecto visual elegante y coherente en todo el sitio, brindando a los usuarios una               experiencia de navegación optimizada para dispositivos móviles y de escritorio.

                Si bien este proyecto no está destinado a la venta real de productos, sirve como una                vitrina para demostrar las habilidades del desarrollador en el campo del comercio           electrónico. Representa su capacidad para conceptualizar, diseñar y construir una               plataforma de comercio electrónico completa, utilizando tecnologías modernas y mejores          prácticas de desarrollo web."</p>
            </div>

            <div className=' flex flex-wrap row-start-3 gap-2 mt-9 md:col-span-2 '> 
                <div className='flex flex-col gap-3 border-t-4 border-black p-5 mb-6 group hover:bg-yellow transition-colors w-full sm:w-[49%] md:w-[32%]'>   
                    <h2 className=' font-bold text-xl group-hover:text-white'>WE ARE TRUSTED</h2>
                    <p className=' text-textgrey group-hover:text-white'>Puedes contar con nosotros para cumplir plazos y ofrecer un servicio excepcional. Valoramos la confianza y mantenemos una comunicación transparente con nuestros clientes.</p>
                </div>

                <div className='flex flex-col gap-3 border-t-4 border-black p-5 mb-6 group hover:bg-yellow transition-colors w-full sm:w-[49%] md:w-[32%]'>
                    <h2 className=' font-bold text-xl group-hover:text-white'>WE ARE PROFESSIONAL</h2>
                    <p className=' text-textgrey group-hover:text-white'>Nuestro equipo de desarrolladores capacitados utiliza las últimas tecnologías y mejores prácticas para crear sitios web funcionales y atractivos, asegurando que tus necesidades sean siempre nuestra prioridad.</p>
                </div>

                <div className='flex flex-col gap-3 border-t-4 border-black p-5 mb-6 group hover:bg-yellow transition-colors w-full sm:w-[49%] md:w-[32%]'>
                    <h2 className=' font-bold text-xl group-hover:text-white'>WE ARE EXPERT</h2>
                    <p className=' text-textgrey group-hover:text-white'>Con años de experiencia, ofrecemos soluciones personalizadas que superan tus expectativas. Nuestro conocimiento en desarrollo web garantiza un producto final innovador y efectivo para tu negocio de mano de las mejores tecnologias en el mercado</p>
                </div>
            </div>
        </div>

        
    )
}