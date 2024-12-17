import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useHistoryStore = create((set) => ({
  currentPage: '/',
  previousPage: null,
  updateHistory: (newPath) => {
    set((state) => ({
      previousPage: state.currentPage,
      currentPage: newPath
      
    }));
  }
}));

