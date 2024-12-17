import { BrowserRouter,Routes,Route,Navigate,useLocation ,useResolvedPath } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// index
import Index from './components/index/Index.jsx'

//shop
import Shop from './components/shop/Shop.jsx'

//car
import Cart from './components/cart/Cart.jsx'

//productDetails
import ProducDetails from './components/products/ProductDetails.jsx';

//about Us
import AboutUs from './components/aboutUs/AboutUs.jsx';

//contact
import ContactUs from './components/contact/ContactUs.jsx'; 


// Whishlist
import Whishlist from './components/wishlist/Whishlist.jsx';

//Base
import Base from './components/Base.jsx'


import NextVersion from './components/NextVersion.jsx';

import useSesion from './store/useSesion.jsx';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';
import getNewToken from './services/login/getNewToken.js';
import ApiServerAuthenticated from './services/ApiServerAuthenticated.js';


const Protected = ({children,isLoggedIn}) =>{
      if (!isLoggedIn) return <Navigate to={'/'} />
      
      else  return children     
}

function App() {
      
      const usuario = useSesion() 
      const token = ApiServerAuthenticated()

      useEffect(() => {
            const reloadToken = async () => {
                  if(usuario.isLoggedIn){
                        try{
                              const newToken = await getNewToken(usuario)
                              usuario.setAccess_token(newToken)
                              const response = await token.get('/carrito/count/')
                              usuario.setCountCart(response.data.count)                              
                        }
                        catch(error){
                              toast.error("Ocurrio un error inesperado")
                        }
                  }
            }
            reloadToken()
      },[usuario.isLoggedIn])

      return (
            
      <BrowserRouter>
            <Toaster visibleToasts={3}/>

            <Routes>
              <Route path="/" element={<Base  />}>
                  <Route index element={<Index />}/>
                  <Route path='shop' element={<Shop />} />
                  <Route path='cart' element={ 
                  <Protected  isLoggedIn={usuario.isLoggedIn}>
                        <Cart/>
                  </Protected> }
                  /> 
                  <Route path='whishlist' element={
                        <Protected isLoggedIn={usuario.isLoggedIn}>
                              <Whishlist />
                        </Protected>} 
                  />
                  <Route path='productDetails/:id' element={<ProducDetails />} />        
                  <Route path='aboutUs' element={<AboutUs />} />
                  <Route path='contactUs' element={<ContactUs />} />
              </Route>
              <Route path={`next/version/`} element={<NextVersion />} />

            </Routes>
  
      </BrowserRouter>

      )

}

export default App



