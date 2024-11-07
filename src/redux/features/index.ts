import {combineReducers} from '@reduxjs/toolkit';
import themeReducer from './Slices/themeSlice';
import userReducer from './Slices/userSlice';
import azureAdReducer from './Slices/azureAdDataSlice';
import bottomSheetReducer from './Slices/bottomSheetViewSlice';
import globalLoaderReducer from './Slices/loaderSlice';
import userDetailsReducer from './Slices/userDetails';
import homePageDataReducer from './Slices/homePageData';
import masterDataReducer from './Slices/masterDataSlice';
import homePageFiltersReducer from './Slices/homePageFilters';
import notificationCountReducer from './Slices/notificationCount';
import behaviourMatrixSliceRedcuer from './Slices/behaviourSlice';
import headerButtonAlertRedcuer from './Slices/headerButtonAlert';
import locationBottomSheetSlice from './Slices/locationBottomSheetSlice';
import  loginDetailsSlice from './Slices/loginDetailsSlice';


//createing root reducer for all the reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  azureAd: azureAdReducer,
  bottomSheetVisibility: bottomSheetReducer,
  globalLoader: globalLoaderReducer,
  userData: userDetailsReducer,
  homePageData: homePageDataReducer,
  masterData: masterDataReducer,
  homePageFilters: homePageFiltersReducer,
  notificationCount: notificationCountReducer,
  behaviourMatrixData: behaviourMatrixSliceRedcuer,
  headerAlert: headerButtonAlertRedcuer,
  locationBottomSheetSlice: locationBottomSheetSlice,
  loginDetails:loginDetailsSlice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
