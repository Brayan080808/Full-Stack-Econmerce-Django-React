import React from 'react'
import { FaRegClock } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'


const NextVersion = () => {
        const navigate =  useNavigate()

    const handleReturn = () => {
        navigate(-1)
    }
    
  return (
    <div className="w-full mt-20 p-6 ">
      <div className="flex flex-col items-center justify-center text-center">
        <FaRegClock className="w-16 h-16 mb-4 text-[#b0b435]" />
        <h2 className="text-2xl font-semibold mb-2 text-black">Próximamente</h2>
        <p className="text-[#999999] mb-4">
          Esta sección aún no está disponible. Estamos trabajando duro para traerte nuevas funcionalidades en futuras versiones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={handleReturn} className="bg-[#b0b435] text-white hover:bg-[#9ca12f] px-4 py-2 rounded-md transition-colors">
            Volver a la pagina
          </button>

        </div>
      </div>
    </div>
  )
}
export default NextVersion