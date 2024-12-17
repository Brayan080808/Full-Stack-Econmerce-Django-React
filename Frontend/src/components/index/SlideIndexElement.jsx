import { NavLink } from 'react-router-dom' 

const SlideIndexElement= ({ image }) => {

    return (
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className='bg-cover text-white relative'
      >
          
          <div className='bg-opacity-50 py-32 bg-[#333] flex justify-center'>
                      
                <div className='text-center space-y-10 sm:space-y-4'>
                           <h1 className=' text-6xl sm:text-7xl mx-auto'>
                              <strong>Welcome To</strong> <br />
                                  Freshshop
                              </h1>
          
                              <p className='px-12  text-sm sm:text-base'>See how your users experience your website in realtime or view <br />trends to see any changes in performance over time.</p>
                        
                        <button className='bg-yellow p-3  transition-colors hover:bg-black'>
                          <NavLink to='/shop/' >Shop New</NavLink>
                        </button>
                </div>   
          </div>     
      </div>
    );
};
export default SlideIndexElement;