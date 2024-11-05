import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isLocationBottomSheetVisible: false,
  selectedLocations:[],
};

const locationBottomSheetSlice = createSlice({
  name: 'locationBottomSheetSlice',
  initialState,
  reducers: {
    setLocationBottomSheetEnable: state => {
      state.isLocationBottomSheetVisible = true;
    },
    setLocationBottomSheetDisable: state => {
      state.isLocationBottomSheetVisible = false;
    },
    setselectedLocations: (state,action) => {
        const serializableData = action.payload;
        state.selectedLocations = serializableData;
      },
      clearSelectedLocations: (state) => {
        
        state.selectedLocations = [];
      },
  },
});

export const {setLocationBottomSheetEnable, setLocationBottomSheetDisable,setselectedLocations,clearSelectedLocations} =
locationBottomSheetSlice.actions;

export default locationBottomSheetSlice.reducer;
