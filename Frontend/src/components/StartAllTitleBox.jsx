import { NavLink } from 'react-router-dom'

import AllBgTitle from '../img/all-bg-title.jpg'

import { useEffect } from 'react' 



import { useHistoryStore } from '../store/useHistoryStore'

import { useLocation } from 'react-router-dom'

const StartAllTitleBox = ({page}) =>{

    const history = useHistoryStore()
    const location = useLocation()

    useEffect(
        () => {
            history.updateHistory(location.pathname)
        }
        ,[]
    )


    return(
        <div className='  bg-fixed ' 
        style={{backgroundImage: `url(${AllBgTitle})`,
          }}>
            <div className='px-4 py-16 sm:px-16 bg-black bg-opacity-60  '>

                <div className='flex justify-between items-center '>
                    <h2 className=' text-3xl font-bold text-white'>{page}</h2>
                
                    <ul className='bg-yellow flex p-2 items-center'>
                        <li className='text-white   p-2 cursor-pointer'>
                            <NavLink to='/'> Home </NavLink>
                        </li>
                        <li>/</li>
                        <li className= 'p-2'>
                            <span>{page}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
)
}
export default StartAllTitleBox