import { CiSearch } from "react-icons/ci";

const IndexError = () => {
  return (
    <div className="w-full h-96  p-6 mt-20">
      <div className="flex flex-col items-center justify-center text-center">
        <CiSearch className="w-12 h-12 mb-4 text-yellow" />
        <h2 className="text-2xl font-semibold mb-2 text-black">Ocurrio un error al cargar la pagina</h2>
        <p className="text-[#999999] mb-4">
          Lo sentimos, no se pudo cargar la pagina en este momento
        </p>

      </div>
    </div>
  )
}
export default IndexError;