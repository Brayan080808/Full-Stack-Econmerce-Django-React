import Slider from "react-slick";
import { FaAngleRight,FaAngleLeft} from 'react-icons/fa'
import { useState } from "react";



const SamplePrevArrow= (props) =>{
  const { className, style, onClick } = props;  
    return (
      <div className='absolute z-10 h-full flex items-center  left-[-1.3rem] '>    
            <div
              className=" p-2 bg-black bg-opacity-40 hover:bg-black cursor-pointer transition-colors mb-20" 
              onClick={onClick} >
              <FaAngleLeft className='text-white text-2xl mx-auto '/>
            </div>  
      </div>
    );
  

}

const SampleNextArrow = (props) =>{
    const { className, style, onClick } = props
    return (
        <div className='absolute z-10 h-full flex items-center right-[-1.3rem] top-0'>    
              <div
                className=" p-2 bg-black bg-opacity-40 hover:bg-black cursor-pointer transition-color mb-20" 
                onClick={onClick} >
               <FaAngleRight className='text-white text-2xl mx-auto '/>
             </div>  
        </div>
    );
  }

export const ProductImgs = ({imgs}) =>{

  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

        dotsClass:'relative',
        appendDots: dots => (
            <div>
              <ul className="flex justify-center gap-1 "> {dots} </ul>
            </div>
          ),
          customPaging: i => (
          
            <div className="w-20 h-20 shadow-2xl">
              <img src={imgs[i]} alt="" className="w-full h-full object-cover"/>          
            </div>
          )

    
      };

      return(
        <div className='w-[85%] sm:w-[85%] ml:w-[70%] mx-auto '>
        <Slider {...settings}>
            {imgs.map((img,index) => (
                  <div key={index} className=' h-[350px] mx-auto sm:w-[70%] ml:w-[70%] '>
                    <img src={img} alt=""  className=' w-full h-full object-cover '/>
                  </div>
            ))}
           
        </Slider>
        </div>
        
          
      )
} 
