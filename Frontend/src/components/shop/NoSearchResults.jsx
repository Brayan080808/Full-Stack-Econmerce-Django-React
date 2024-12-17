import { CiSearch } from "react-icons/ci";

const NoSearchResults = () => {
  return (
    <div className="w-full p-6 mt-7">
      <div className="flex flex-col items-center justify-center text-center">
        <CiSearch className="w-12 h-12 mb-4 text-yellow" />
        <h2 className="text-2xl font-semibold mb-2 text-black">No se encontraron resultados</h2>
        <p className="text-[#999999] mb-4">
          Lo sentimos, no pudimos encontrar productos que coincidan con tu búsqueda.
        </p>

      </div>
    </div>
  )
}
export default NoSearchResults;