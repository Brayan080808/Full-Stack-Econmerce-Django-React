import useFetchCart from "../../hooks/cart/useFetchCart"
import Spiner from '../Spiner.jsx'
import { NavLink } from 'react-router-dom'

const OrderBox = () => {
    const {isPending, isError, data, error } = useFetchCart("/shop/carro_compra/")

    if (isPending) return <Spiner/>
    if (isError) return <h3> Error: {error.message}</h3> 
    if (data.length === 0 ) return 

    
    let subTotal = 0
    for (let i=0; i<data.length;i++){
        subTotal+=data[i].precio_total
    }

    const discountTotal = (subTotal*0.10).toFixed(2)
    const tax = 2
    const grandTotal = (subTotal - discountTotal - tax).toFixed(2)
       

    return(
        <div className="w-full px-8 ">
            <ul className="w-full md:w-[50%] md:ml-[50%] p-16 flex flex-col gap-4 relative right-0 shadow-2xl mb-6">
                <li className="flex justify-between  ">
                    <h3 className=" font-bold text-black text-2xl">Order summary</h3>
                </li>
                <li className="flex justify-between  ">
                    <span>Sub Total</span>
                    <span className=" font-bold text-[#666666]">${subTotal}</span>
                </li>
                <li className="flex justify-between border-b-2 border-lightGrey pb-3 ">
                    <span>Discount</span>
                    <span className=" font-bold text-[#666666]">${discountTotal}</span>
                </li >
                <li className="flex justify-between ">
                    <span>Tax</span>
                    <span className=" font-bold text-[#666666]">$2</span>
                </li>
                <li className="flex justify-between pb-3 ">
                    <span>Shipping Cost</span>
                    <span className=" font-bold text-[#666666]">Free</span>
                </li>
                <li className="flex justify-between  border-y-2 border-lightGrey py-5">
                    <span className="text-yellow font-semibold">Grand Total</span>
                    <span className=" font-bold text-[#666666]">${grandTotal}</span>
                </li>

                <li className="relative py-3">
                    <button className=" bg-yellow hover:bg-black text-white p-3 absolute right-0 transition-colors">
                        

                        <NavLink to="/next/version/"> 
                            Checkout

                        </NavLink>
                    </button>
                </li>
            </ul>
            
        </div>
    )
}
export default OrderBox;