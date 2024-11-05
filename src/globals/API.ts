import Config from "react-native-config";

// const BASE_URL = Config.BASE_URL;
const BASE_URL = 'https://prosaresdev03.azurewebsites.net/api';

export default {
  AuthorizeUser: `${BASE_URL}/Login/AuthorizeUser`,
  Logout: `${BASE_URL}/Login/Logout`,
  GetHomePageData: `${BASE_URL}/Behaviour/GetHomePageData`,
  GetAlertConfig: `${BASE_URL}/Behaviour/GetAlertConfig`,
  BehaviourGetConfig: `${BASE_URL}/Behaviour/GetAlertConfig`,
  GetMeasurementCriteriaDetails: `${BASE_URL}/Behaviour/GetMeasurementCriteriaDetails`,
  SaveAlert: `${BASE_URL}/Behaviour/SaveAlert`,
  GetNotications: `${BASE_URL}/Notification/GetNotications`,
  ClearNotications: `${BASE_URL}/Notification/ClearNotications`,
  MarkAsRead: `${BASE_URL}/Notification/MarkAsRead`,
  GetMasterData: `${BASE_URL}/Behaviour/GetMasterData`,
  getProfileData: `${BASE_URL}/Login/GetUserDataForFeedback`,
  SaveFeedBack: `${BASE_URL}/Feedback/SaveFeedback`,
  GetFeedbackDetails: `${BASE_URL}/Feedback/GetFeedbackDetails`,
  ApproveFeedback: `${BASE_URL}/Feedback/ApproveFeedback`,
  GetPosts: `${BASE_URL}/Post/GetPosts`,
  LikeDislikePost: `${BASE_URL}/Post/LikeDislikePost`,
};
