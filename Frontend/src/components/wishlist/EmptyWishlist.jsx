import { NavLink } from 'react-router-dom' 
import { FaRegHeart } from 'react-icons/fa'


const EmptyWishlist = () => {
    return (
      <div className=" w-full  p-6 mt-10">
        <div className="flex flex-col items-center justify-center text-center">
          <FaRegHeart className="w-12 h-12 mb-4 text-yellow" />
          <h2 className="text-2xl font-semibold mb-2 text-black">Tu lista de deseos está vacía</h2>
          <p className="text-[#999999] mb-4">
            Guarda tus productos favoritos para comprarlos más tarde.
          </p>
          <NavLink to='/shop/'>
              <button className="bg-yellow text-white hover:bg-[#9ca12f] px-4 py-2 rounded-md  transition-colors">
                  Descubrir productos
              </button>
          </NavLink>
        </div>
      </div>
    )
}
export default EmptyWishlist