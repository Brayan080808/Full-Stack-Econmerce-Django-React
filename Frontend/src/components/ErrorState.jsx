import React from 'react'
import { FiAlertTriangle } from "react-icons/fi";
import { NavLink } from 'react-router-dom';

const ErrorState = ({refetch}) => {
   

  return (
    <div className="w-full p-6 my-10 ">
      <div className="flex flex-col items-center justify-center text-center">
        <FiAlertTriangle className="w-16 h-16 mb-4 text-[#b0b435]" />
        <h2 className="text-2xl font-semibold mb-2 text-black">¡Ups! Algo salió mal</h2>
        <p className="text-[#999999] mb-4">
          Lo sentimos, ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.
        </p>
        <div className="flex gap-4">
          <NavLink to="/">
            <button className="bg-[#b0b435] text-white hover:bg-[#9ca12f] px-4 py-2 rounded-md transition-colors">
                Volver al inicio
            </button>
          </NavLink>
          <button onClick={refetch} className="bg-[#f4f4f4] text-[#999999] hover:bg-[#e0e0e0] px-4 py-2 rounded-md transition-colors">
            Intentar de nuevo
          </button>
        </div>
      </div>
    </div>
  )
}
export default ErrorState;