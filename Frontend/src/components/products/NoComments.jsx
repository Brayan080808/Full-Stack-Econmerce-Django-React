import { FiMessageSquare } from "react-icons/fi";

const NoComments = () => {
  return (
    <div className="w-full  p-6 ">
      <div className="flex flex-col items-center justify-center text-center">
        <FiMessageSquare className="w-12 h-12 mb-4 text-yellow" />
        <h2 className="text-2xl font-semibold mb-2 text-black">No hay comentarios aún</h2>
        <p className="text-[#999999] mb-4">
          Se el primero en compartir tu opinión sobre este producto.
        </p>
      </div>
    </div>
  )
}
export default NoComments;