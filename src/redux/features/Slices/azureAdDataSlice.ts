import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  azureAdData: null
};

const azureAdSlice = createSlice({
  name: 'azureAd',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const serializableData = JSON.parse(JSON.stringify(action.payload));      
      state.azureAdData = action.payload;
    },
    clearAuthData: state => {
      console.log("Inside clearAuthData")
      state.azureAdData = null;
    },
  },
});

// Export actions and reducer
export const {setAuthData, clearAuthData} = azureAdSlice.actions;
export default azureAdSlice.reducer;
