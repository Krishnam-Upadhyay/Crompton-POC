//Add selectors here

//Azure Ad data
export const azureAuthData = (state: any) => state.azureAd.azureAdData;

//Bottom Sheet visibility flag
export const bottomSheetVisibility = (state: any) =>
  state.bottomSheetVisibility.isBottomSheetVisible;

//Loading flag
export const isLoading = (state: any) => state.globalLoader.isLoading;

//User Details
export const userDetails = (state: any) => state.userData.userDetails || [];

//Home Page Data
export const homePageDetails = (state: any) =>
  state?.homePageData?.homePageDetails || [];

//Master Data
export const masterDetails = (state: any) =>
  state?.masterData?.masterDetails || [];

//Master Data
export const homePageStatusFilter = (state: any) =>
  state?.homePageFilters?.statusFilter || null;

//Master Data
export const homePageCategoryFilter = (state: any) =>
  state?.homePageFilters?.categoryFilter || null;

//Check home screen filter checkbox is cleared or not
export const checkIsHomeScreenCheckboxCleared = (state: any) =>
  state?.homePageFilters?.isFiltersCheckboxCleared || false;

//Master Data
export const notificationCount = (state: any) =>
  state?.notificationCount?.notificationCount || 0;

//BehaviourMatrixdata
export const behaviourMatrix = (state: any) =>
  state.behaviourMatrixData.behaviourMatrixSlice;
//Criterias
export const CriteriasData = (state: any) =>
  state.behaviourMatrixData.Criterias;
//BehaviourDescription
export const behaviourDescription = (state: any) =>
  state.behaviourMatrixData.BehaviourDiscription;

//BehaviourDescription
export const isHeaderAlertShown = (state: any) => state.headerAlert.isHeaderAlertShown;

//Bottom Sheet visibility Location
export const locationBottomSheetVisibility = (state: any) =>
  state.locationBottomSheetSlice.isLocationBottomSheetVisible;
//Bottom Sheet visibility Location
export const locationSelectedLocations = (state: any) =>
  state.locationBottomSheetSlice.selectedLocations;