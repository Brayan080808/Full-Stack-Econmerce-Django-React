import { CiShoppingCart } from "react-icons/ci";
import { NavLink } from "react-router-dom"; 

const EmptyCart = () => {
  return (
    <div className="w-full p-6 mt-10">
      <div className="flex flex-col items-center justify-center text-center">
        <CiShoppingCart className="w-12 h-12 mb-4 text-yellow" />
        <h2 className="text-2xl font-semibold mb-2 text-black">Tu carrito está vacío</h2>
        <p className="text-[#999999] mb-4">
          Agrega algunos productos increíbles a tu carrito y comienza a comprar.
        </p>
        <NavLink to='/shop/'>
            <button className="bg-yellow text-white hover:bg-[#9ca12f] px-4 py-2 rounded-md transition-colors">
                Explorar productos
            </button>
        </NavLink>
      </div>
    </div>
  )
}
export default EmptyCart;