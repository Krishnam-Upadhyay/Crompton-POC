import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: 'globalLoader',
  initialState,
  reducers: {
    setGlobalLoaderEnable: state => {
      state.isLoading = true;
    },
    setGlobalLoaderDisable: state => {
      state.isLoading = false;
    },
  },
});

export const {setGlobalLoaderEnable, setGlobalLoaderDisable} =
  loaderSlice.actions;

export default loaderSlice.reducer;
