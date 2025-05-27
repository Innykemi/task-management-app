import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  filter: 'all' | 'pending' | 'completed';
  search: string;
}

const initialState: UIState = {
  theme: (typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark') ? 'dark' : 'light',
  filter: 'all',
  search: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<UIState['filter']>) => {
      state.filter = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload)
        document.documentElement.classList.toggle('dark', action.payload === 'dark')
      }
    },
  },
});

export const { setFilter, setSearch, setTheme } = uiSlice.actions;
export default uiSlice.reducer;