import { useState, useEffect, useRef } from "react"


export const SelectElement = ({filtro,setFiltro,options,setUrl}) =>{

    const [choose,setChoose] = useState(0)    
    const [selectToggle,setSelectToggle]=useState(false)
    const dropdownRef = useRef()
    const dropdownRefSearchButton = useRef()
    

    useEffect(() => {
      setChoose(filtro)
    },[filtro])

    useEffect(() => { 
      let opcion = choose;
      opcion === 0 ? opcion = null : opcion

      setFiltro(opcion)
      setUrl()
      setSelectToggle(false)
    },[choose])

    useEffect(() => {
      const handleClickOutside = (event) => {

          if (dropdownRef.current && !dropdownRef.current.contains(event.target) && dropdownRefSearchButton.current && !dropdownRefSearchButton.current.contains(event.target)) {
              setSelectToggle(false); // Cierra el menú al hacer clic fuera
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);


    filtro===null ? filtro=0 : filtro

    
    function toggleDropdown(){
        return selectToggle === true ?' animate-move-down pointer-events-auto shadow-2xl':'animate-move-up ';
    }

    return(
      <>
        <div className="relative w-full">
          <button className=" text-left relative p-3 w-[13rem] bg-black text-white hover:bg-yellow transition-colors " onClick={() => setSelectToggle( !selectToggle )} ref={dropdownRefSearchButton}>
            {options[filtro]}
          </button>

          <div className={`absolute left-0 right-0 h-[50vh] text-sm text-textgrey z-[15] pointer-events-none overflow-hidden `} ref={dropdownRef}>
            <div className={`relative z-[15] w-[13rem] left-0 flex flex-col
              ${toggleDropdown()}`}>

              {options.map((option,index) => (
                
                  <button key={index} onClick={() => setChoose(index)} className={` hover:bg-yellow hover:text-white transition-colors text-left  py-3 px-4 ${index != 0 && "border-white border-t-[1px]  "} 
                  ${choose === index?"bg-yellow text-white":"bg-white "}`}>
                    {option} 
                    
                  </button>))
              }
            </div>
          </div>
        </div>
      </>
    )
  }
  


