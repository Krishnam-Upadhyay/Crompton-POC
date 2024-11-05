import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isBottomSheetVisible: false,
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheetVisibility',
  initialState,
  reducers: {
    setBottomSheetEnable: state => {
      state.isBottomSheetVisible = true;
    },
    setBottomSheetDisable: state => {
      state.isBottomSheetVisible = false;
    },
  },
});

export const {setBottomSheetEnable, setBottomSheetDisable} =
  bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
