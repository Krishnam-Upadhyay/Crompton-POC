import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  homePageDetails: [],
};

const homePageDataSlice = createSlice({
  name: 'homePageData',
  initialState,
  reducers: {
    setHomePageData: (state, action) => {
      const serializableData = action.payload;

      // console.log('serializableData: ', serializableData);

      state.homePageDetails = serializableData;
    },
    clearHomePageData: state => {
      state.homePageDetails = [];
    },
  },
});

// Export actions and reducer
export const {setHomePageData, clearHomePageData} = homePageDataSlice.actions;
export default homePageDataSlice.reducer;
