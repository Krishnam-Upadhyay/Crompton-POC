import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loginDetails:[],
};

const loginDetailsSlice = createSlice({
  name: 'loginDetails',
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      const serializableData = action.payload;
      state.loginDetails = serializableData;
    },
  },
});

// Export actions and reducer
export const {setLoginDetails } = loginDetailsSlice.actions;
export default loginDetailsSlice.reducer;
