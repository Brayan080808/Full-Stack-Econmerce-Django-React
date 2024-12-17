// Headers
import MainTop from './header/MainTop.jsx'
import MainHeader from './header/MainHeader.jsx'

// footer
import {InstagramFeed} from './footer/InstagramFeed.jsx'
import {StartFooter} from './footer/StartFooter.jsx'
import {CopyRight} from './footer/CopyRight.jsx'
import Register from './autenticacion/Register.jsx'

import { Outlet, useResolvedPath } from 'react-router-dom'
import {useEffect } from 'react'
import useUpper from '../hooks/useUpper.js'
import UpperButton from './UpperButton.jsx'

const Base = () => {
  const location = useResolvedPath()

  useEffect(
    () => useUpper('instant'),
      [location]
    );


    
    return(
      <div className='overflow-x-clip relative '>

        <Register />
        <MainTop />
        <MainHeader />
        
        <UpperButton />
  
        <Outlet />
  
        <InstagramFeed /> 
        <StartFooter />
        <CopyRight />
      
      </div>

    )
}
export default Base