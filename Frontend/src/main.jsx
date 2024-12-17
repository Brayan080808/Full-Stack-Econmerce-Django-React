import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(

      <QueryClientProvider client={queryClient}> 
            <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_OAUTH_CLINET_ID}>
                  <App />
            </GoogleOAuthProvider>
      </QueryClientProvider>  
)

