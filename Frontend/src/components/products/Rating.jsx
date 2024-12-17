import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const product = {
    id: '1',
    name: "Wireless Noise-Cancelling Headphones",
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancelling technology, these headphones provide an immersive listening experience whether you're commuting, working, or relaxing at home.",
    price: 299.99,
    rating: 4.7,
    inStock: 50,
    category: "Electronics",
    brand: "AudioTech",
    isWishlisted: false,
    image: "/placeholder.svg?height=600&width=600"
}



const Rating = ({ count, ratingAvg, distributionRating }) => {

    return (
        <>
        <div className="flex items-center mb-6 text-yellow-500">
            <div className="mr-4">
                <span className="text-5xl font-bold">{ratingAvg}</span>
                <span className="text-gray-500"> out of 5</span>
            </div>
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-3xl ${star <= ratingAvg ? 'text-yellow' : 'text-gray-300'}`}>
                        <FaStar />
                    </span>
                ))}

            </div>
            <span className="ml-4 text-sm text-gray-500">{count} ratings</span>
        </div>

        <div className="grid grid-cols-[auto,1fr,auto] gap-2 mb-8">
            {distributionRating.map((item, index) => (
                
            <div key={index} className="contents">
                <div className="flex items-center">
                    <span className="mr-2 text-black">{item.rating} star</span>
                </div>
                <div className=" bg-lightGrey w-full h-4 rounded">
                    <div style={{ width: `${item.porcentaje}%` }} className="bg-yellow h-full rounded" />
                    </div>
                    <span className="text-sm text-black ml-2">{item.porcentaje}%</span>
                </div>
            ))}
        </div>
    </>
    );
};

export default Rating;