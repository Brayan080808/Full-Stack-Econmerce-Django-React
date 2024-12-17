import { create } from 'zustand';
import { persist, createJSONStorage  } from 'zustand/middleware';

const useSesion = create(
  persist(
    (set) => ({
      // Estado inicial
      isLoggedIn: false,
      access_token: '',
      refresh_token: '',
      user: null,
      countCart: 0,

      // Acciones para actualizar el estado
      setAccess_token: (token) => set({ access_token: token }),
      setRefresh_token: (token) => set({ refresh_token: token }),
      setUser: (data) => set({ user: data }),
      setCountCart: (count) => set({countCart: count}),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({isLoggedIn: false, access_token: '', refresh_token: '',user: null,countCart: 0}),

      

      // Actualizar el estado cada 5 segundos
      
    }),
    {
      name: 'sesion',
     
    }
  )
);

export default useSesion;

