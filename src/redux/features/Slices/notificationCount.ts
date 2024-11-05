import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notificationCount: 0,
};

const notificationCountSlice = createSlice({
  name: 'notificationCount',
  initialState,
  reducers: {
    setNotificationCount: (state, action) => {
      const serializableData = JSON.stringify(action.payload);

      state.notificationCount = action.payload;
    },
    clearNotificationCount: state => {
      state.notificationCount = 0;
    },
  },
});

// Export actions and reducer
export const {setNotificationCount, clearNotificationCount} =
  notificationCountSlice.actions;
export default notificationCountSlice.reducer;
