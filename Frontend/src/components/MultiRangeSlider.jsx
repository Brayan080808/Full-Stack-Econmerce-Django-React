import React, { useEffect, useState, useRef } from "react";
import { useFiltros } from "../store/useFiltros";
// import "./multiRangeSlider.css";

const MultiRangeSlider = ({ min, max, setPrecio__gte, setPrecio__lte, setUrl }) => {
  const usuario = useFiltros();
  const [minVal, setMinVal] = useState(usuario.precio__gte);
  const [maxVal, setMaxVal] = useState(usuario.precio__lte);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  useEffect(() => {
    setMaxVal(usuario.precio__lte);
    setMinVal(usuario.precio__gte);

  },[usuario.advancedSearch,usuario.precio__gte,usuario.precio__lte])



  // Función para actualizar la barra
  const updateRange = () => {
    const minPercent = Math.round(((minVal - min) / (max - min)) * 100);
    const maxPercent = Math.round(((maxVal - min) / (max - min)) * 100);


    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  };

  useEffect(updateRange, [minVal, maxVal, min, max]);

  function filtrar(min, max) {
    setPrecio__gte(min);
    setPrecio__lte(max);
    setUrl();
  }

  return (
    <div className="relative">
      <div>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(event.target.value, maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="appearance-none pointer-events-none z-10 absolute bg-inherit w-full top-[-5px]"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(event.target.value, minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="appearance-none pointer-events-none z-[11] absolute bg-inherit w-full top-[-5px]"
        />
      </div>

      <div className="w-full relative">
        <div className="absolute h-2 rounded-xl bg-black z-[1] w-full" />
        <div ref={range} className="bg-yellow h-2 rounded-xl absolute z-[2]" />
        <div className="py-5 grid grid-cols-2 gap-2">
          <div className="flex gap-1 text-[#fbb714] text-lg">
            <span>${minVal}</span>
            <span>-</span>
            <span>${maxVal}</span>
          </div>
          <div
            className="p-3 text-center bg-yellow shadow-xl hover:bg-black active:scale-95 text-white cursor-pointer"
            onClick={() => filtrar(minVal, maxVal)}
          >
            <button>Filter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;