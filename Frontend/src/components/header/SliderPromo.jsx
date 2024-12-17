import { FaOpencart } from "react-icons/fa";
import Slider from "react-slick";

const promos=['20% off Entire Purchase Promo code: offT800','50% - 80% off on Vegetables','Off 10%! Shop Vegetables','Off 50%! Shop Now'];

const SliderPromo = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        vertical:true,
        slidesToScroll: 1,
        arrows:false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
      };

    return(
        <div className="w-[34vw] " >
            <Slider {...settings} >
                {promos.map((text,index) => (
                    <div className=" h-14 m-1 ml:translate-y-3  " key={index}>
                        <div className="   ">
                            <span className="">
                            <FaOpencart className=" text-yellow text-3xl inline mr-2"/>
                            {text}
                            </span>
                        </div>
                    </div>
                ))} 
            </Slider>
        </div>
      )
}
export default SliderPromo;