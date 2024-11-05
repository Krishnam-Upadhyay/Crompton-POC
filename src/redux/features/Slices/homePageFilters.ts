import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  statusFilter: '',
  categoryFilter: '',
  isFiltersCheckboxCleared: true,
};

const homePageFiltersSlice = createSlice({
  name: 'homePageFilters',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    clearStatusFilter: state => {
      state.statusFilter = '';
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    clearCategoryFilter: state => {
      state.categoryFilter = '';
    },
    setIsFiltersCheckboxCleared: (state, action) => {
      state.isFiltersCheckboxCleared = false;
    },
    clearIsFiltersCheckboxCleared: state => {
      state.isFiltersCheckboxCleared = true;
    },
  },
});

// Export actions and reducer
export const {
  setStatusFilter,
  clearStatusFilter,
  setCategoryFilter,
  clearCategoryFilter,
  setIsFiltersCheckboxCleared,
  clearIsFiltersCheckboxCleared,
} = homePageFiltersSlice.actions;
export default homePageFiltersSlice.reducer;
