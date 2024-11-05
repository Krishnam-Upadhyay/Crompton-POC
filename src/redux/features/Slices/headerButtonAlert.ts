import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isHeaderAlertShown: false,
};

const headerAlertSlice = createSlice({
  name: 'headerAlert',
  initialState,
  reducers: {
    setHeaderAlertEnable: state => {
      state.isHeaderAlertShown = true;
    },
    setHeaderAlertDisable: state => {
      state.isHeaderAlertShown = false;
    },
  },
});

export const {setHeaderAlertEnable, setHeaderAlertDisable} =
  headerAlertSlice.actions;

export default headerAlertSlice.reducer;
