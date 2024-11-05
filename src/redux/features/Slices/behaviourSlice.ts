import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  behaviourMatrixSlice: {},
  Criterias:[],
  BehaviourDiscription:"",
};

const behaviourMatrixSlice = createSlice({
  name: 'behaviourMatrixData',
  initialState,
  reducers: {
    setMatrixData: (state, action) => {
      const serializableData = action.payload;

      // console.log('serializableData: ', serializableData);

      state.behaviourMatrixSlice = serializableData;
    },
    
    clearMatrixData: state => {
      state.behaviourMatrixSlice = {};
    },
    setCriterias: (state, action) => {
      const serializableData = action.payload;

    
      state.Criterias = serializableData;
    },
    clearCriterias: state => {
     
      state.Criterias = [];
    },
    setBehaviourDescription: (state, action) => {
      const serializableData = action.payload;

    
      state.BehaviourDiscription = serializableData;
    },
    clearBehaviourDescription: state => {
     
      state.BehaviourDiscription = "";
    },
  },
});

// Export actions and reducer
export const {setMatrixData, clearMatrixData,setCriterias,clearCriterias,setBehaviourDescription,clearBehaviourDescription} = behaviourMatrixSlice.actions;
export default behaviourMatrixSlice.reducer;
