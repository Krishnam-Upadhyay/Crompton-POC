import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userDetails: [],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const serializableData = JSON.stringify(action.payload);

      state.userDetails = action.payload;
    },
    clearUserData: state => {
      state.userDetails = [];
    },
  },
});

// Export actions and reducer
export const {setUserData, clearUserData} = userDataSlice.actions;
export default userDataSlice.reducer;
