import Slider from "react-slick";


import imgInstagram01 from '../../img/instagram-img-01.jpg';
import imgInstagram02 from '../../img/instagram-img-02.jpg';
import imgInstagram03 from '../../img/instagram-img-03.jpg';
import imgInstagram04 from '../../img/instagram-img-04.jpg';
import imgInstagram05 from '../../img/instagram-img-05.jpg';
import imgInstagram06 from '../../img/instagram-img-06.jpg';
import imgInstagram07 from '../../img/instagram-img-07.jpg';
import imgInstagram08 from '../../img/instagram-img-08.jpg';
import imgInstagram09 from '../../img/instagram-img-09.jpg';
import InsBg from '../../img/ins-bg.jpg';
import { FaArrowRight,FaArrowLeft } from 'react-icons/fa';




const SampleNextArrow = (props) =>{
  const {  onClick } = props
  return (
    
      <div
        className={" absolute w-16 h-[100%] right-[-4rem] top-0 flex items-center hover:bg-yellow cursor-pointer"}
        onClick={onClick}>
          <FaArrowRight className=' text-white text-4xl mx-auto  '/>
      </div>
    
  );
}

const SamplePrevArrow= (props) =>{
  const { onClick } = props;  
    return (
      
      <div
        className={" absolute w-16 h-[100%] left-[-4rem] top-0 flex items-center hover:bg-yellow cursor-pointer"}
        onClick={onClick} >
           <FaArrowLeft className=' text-white text-4xl mx-auto '/>
      </div>
      
    );
  

}


export const InstagramFeed = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]

  };

    return (

      <div style={{
        backgroundImage: `url(${InsBg})`,
      }}>
      
          <div className=" bg-[rgba(0,0,0,0.9)] px-16 py-20 relative">
            <Slider {...settings}>
                <InstagramElement imgInstagram={imgInstagram01} />
                <InstagramElement imgInstagram={imgInstagram02} />
                <InstagramElement imgInstagram={imgInstagram03} />
                <InstagramElement imgInstagram={imgInstagram04} />
                <InstagramElement imgInstagram={imgInstagram05} />
                <InstagramElement imgInstagram={imgInstagram06} />
                <InstagramElement imgInstagram={imgInstagram07} />
                <InstagramElement imgInstagram={imgInstagram08} />
                <InstagramElement imgInstagram={imgInstagram09} />
            </Slider>
          </div>

      </div>
      
    )
} 


export const InstagramElement =({imgInstagram}) =>{
    
    return (
        <div className=" w-30 h-30">
                <img src={imgInstagram} alt="Instagram" />
                    
                <div className="hov-in">
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
        </div>
    )
}



