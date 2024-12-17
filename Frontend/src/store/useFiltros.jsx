import { create } from 'zustand'

export const useFiltros = create((set) => ({
      
      ordering:  null,
      precio__gte : 0,
      precio__lte: 30,
      advancedSearch: "",
      categoria_producto: null,
      url: `/api/shop/?advancedSearch=&categoria_producto=&ordering=&precio__gte=0&precio__lte=30`,


      setAdvancedSearch: (value) => set(() => ({ advancedSearch: value})),
      setOrdering: (value) => set(() => ({ ordering: value})),
      setPrecio__gte: (value) => set(() => ({ precio__gte: value})),
      setPrecio__lte: (value) => set(() => ({ precio__lte: value})),
      setCategoria_producto: (value) => set(() => ({ categoria_producto: value})),


      setUrl: () => set((state) => ({
            
            url: `/api/shop/?advancedSearch=${state.advancedSearch}&categoria_producto=${state.categoria_producto === null ? "" : state.categoria_producto}&ordering=${state.ordering === null ? "": state.ordering === 1 ? "-precio" : "precio"}&precio__gte=${state.precio__gte}&precio__lte=${state.precio__lte}`
      
      }))
}))
  