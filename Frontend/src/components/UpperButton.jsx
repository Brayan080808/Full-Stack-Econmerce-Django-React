import { GoArrowUp } from "react-icons/go";
import useUpper from "../hooks/useUpper.js";


const UpperButton = () =>{
    return(
        <>
            <button className="bg-yellow p-2 text-xl font-semibold hover:bg-black text-white fixed z-40 bottom-7 right-7 transition-colors shadow-2xl" onClick={() => useUpper('smooth')}>
                <GoArrowUp />
            </button>
        </>
    )
}
export default UpperButton;