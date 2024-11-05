import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  masterDetails: [],
};

const masterDataSlice = createSlice({
  name: 'masterData',
  initialState,
  reducers: {
    setMasterData: (state, action) => {
      const serializableData = action.payload;

      // console.log('serializableData: ', serializableData);

      state.masterDetails = serializableData;
    },
    clearMasterData: state => {
      state.masterDetails = [];
    },
  },
});

// Export actions and reducer
export const {setMasterData, clearMasterData} = masterDataSlice.actions;
export default masterDataSlice.reducer;
