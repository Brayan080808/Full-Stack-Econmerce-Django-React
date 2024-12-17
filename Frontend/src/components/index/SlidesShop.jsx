import { FaAngleRight,FaAngleLeft} from 'react-icons/fa'
import Slider from "react-slick";
import Banner01 from '../../img/banner-01.jpg'
import Banner02 from '../../img/banner-02.jpg'
import Banner03 from '../../img/banner-03.jpg'
import SlideIndexElement from './SlideIndexElement'

const SamplePrevArrow= (props) =>{
  const { className, style, onClick } = props;  
    return (
      <div className='absolute z-10 h-full flex items-center'>    
            <div
              className=" p-2 sm:p-4 bg-yellow hover:bg-black cursor-pointer" 
              onClick={onClick} >
              <FaAngleLeft className='text-white text-2xl sm:text-4xl mx-auto '/>
            </div>  
      </div>
    );
  

}

const SampleNextArrow = (props) =>{
    const { className, style, onClick } = props
    return (
        <div className='absolute z-10 h-full flex items-center right-0 top-0'>    
              <div
                className=" p-2 sm:p-4 bg-yellow hover:bg-black cursor-pointer" 
                onClick={onClick} >
               <FaAngleRight className='text-white text-2xl sm:text-4xl mx-auto '/>
             </div>  
        </div>
    );
  }
  

export const SlidesShop = () =>{
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade:true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
      };
    return(
        <div className='slider-container'>


            <Slider {...settings} >
            
                  <SlideIndexElement image={Banner01} />
                  <SlideIndexElement image={Banner02} />
                  <SlideIndexElement image={Banner03} />
                
            </Slider>

            
        </div>
        
        
          
          
      
    )
}