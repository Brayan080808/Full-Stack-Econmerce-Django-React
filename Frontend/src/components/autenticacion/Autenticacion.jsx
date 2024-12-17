import React, { useEffect, useRef, useState } from 'react';
import { MdClose } from "react-icons/md";

const Autenticacion = ({ children, setShow, show }) => {

    const [isAnimating, setIsAnimating] = useState(false);
    const modalRef = useRef(null);
    

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setShow(false);
        }, 500); // Duración de la animación
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };

    useEffect(() => {
        if (show) {
            setIsAnimating(false);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    return (
        <div className={`flex items-center justify-center w-screen h-screen fixed z-50 bg-black bg-opacity-60 ${isAnimating ? 'animate-fade-out' : 'animate-fade-in'}`}>
            <div ref={modalRef} className={`bg-white shadow-lg rounded-lg p-6 w-96 relative z-50 ${isAnimating ? 'animate-scale-out' : 'animate-scale-in'}`}>
                <button onClick={handleClose} className="absolute top-2 right-2 text-yellow">
                    <MdClose className=' text-xl'/>
                </button>

                {children}
                
            </div>
        </div>
    );
};

export default Autenticacion;