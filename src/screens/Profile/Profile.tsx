import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../globals/colors';
import BaseText from '../../components/BaseText/BaseText';
import fontFamily from '../../globals/fontFamily';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../../redux/selectors/selectors';
import moment from 'moment';
import { GetProfilePic } from '../../components/CommonComponents/CommonComponents';
import ButtonView from '../../components/ButtonView/ButtonView';
import { logoutUser } from '../../Helpers/CommonFunctions/CommonFunctions';
import images from '../../globals/images';
import DeviceInfo from 'react-native-device-info';
import fontSize from '../../globals/fontSize';
import { useNavigation } from '@react-navigation/native';
import { ApiCall } from '../../Helpers/Network/ApiCall';
import API from '../../globals/API';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';

const Profile = () => {
  const userData = useSelector(userDetails);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // console.log('userData: ', userData);

  const userDetailsKeys = [
    { id: 1, key: 'Name', fontSize: 20 },
    { id: 2, key: 'Designation', fontSize: 16 },
    { id: 3, key: 'DeptName', fontSize: 16 },
  ];

  const requiredDataKeys = [
    {label: 'Poornata ID', key: 'PId'},
    {label: 'Manager ID', key: 'ManagerId'},
    {label: 'Manager Name', key: 'ManagerName'},
    {label: 'Birth Date', key: 'DOB'},
    // {label: 'Age', key: 'Age'},
    {label: 'Gender', key: 'Gender'},
    {label: 'Mobile Number', key: 'MobileNumber'},
  ];

  const logoutUserFunction = async () => {
    await logoutUser();
    // dispatch(setGlobalLoaderEnable());
    // const requestBody = JSON.stringify({
    //   UserId: userData.UserId,
    // });
    // const response = await ApiCall(API.Logout, requestBody);
    // console.log('Logout response: ', response);
    // if (response && response.message.toLowerCase() == 'ok' && response.data) {
    //   await logoutUser();
    // } else {
    //   dispatch(setGlobalLoaderDisable());
    //   Alert.alert('Failed to logout user, please try again later');
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.viewContainer}>
        <View style={styles.profileBio}>
          {navigation.canGoBack() ? (
              <View
                style={{ position: 'absolute', top: 20, left: 10, marginLeft: 10,zIndex:1}}>
                <TouchableOpacity
                style={{}}
                  onPress={() => {
                    console.log("navigation: ", navigation)
                    navigation.goBack();
                  }}>
                  <Image
                    source={images.backArrowIcon}
                    style={{ width: 25, height: 25, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </View>
          ) : null}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            {/* <Image source={{uri: base64Image}} style={styles.profilePic} /> */}
            <GetProfilePic />
            <View style={styles.userDetails}>
              {userDetailsKeys.map(ud => {
                return (
                  <BaseText
                    key={ud.id}
                    style={{
                      marginBottom: 10,
                      color: colors.whiteColor,
                      fontSize: ud.fontSize,
                    }}>
                    {userData[ud.key]}
                  </BaseText>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.profileDetailsHeaderView}>
          <BaseText style={styles.profileDetailsHeaderText}>
            Your Profile
          </BaseText>
        </View>
        <ScrollView contentContainerStyle={{}} style={{ width: '100%' }}>
          <View style={styles.profileDetailsView}>
            {requiredDataKeys.map((ud, index) => {
              if (ud.key == 'DOB') {
                return (
                  <View style={styles.profileDetailsInnerView} key={index}>
                    <BaseText style={styles.profileDetailsTitleText}>
                      {ud.label}
                    </BaseText>
                    <BaseText style={{marginHorizontal: 10}}>:</BaseText>
                    <BaseText style={{fontWeight: 'regular'}}>
                      {moment(userData[ud.key]).format('DD MMM')}
                    </BaseText>
                  </View>
                );
              }
              return (
                <View style={styles.profileDetailsInnerView} key={index}>
                  <BaseText style={styles.profileDetailsTitleText}>
                    {ud.label}
                  </BaseText>
                  <BaseText style={{ marginHorizontal: 10 }}>:</BaseText>
                  <BaseText style={{ fontWeight: 'regular' }}>
                    {userData[ud.key]}
                  </BaseText>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            marginTop: -10,
            marginBottom: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ButtonView title="Logout" onPress={logoutUserFunction} />
          <BaseText style={{ fontSize: fontSize.font10, marginTop: -10 }}>
            Version : {DeviceInfo.getVersion()}
          </BaseText>
          {/* <BaseText>asdaasass</BaseText> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  baseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.screenBackgroundColor,
  },
  profileBio: {
    backgroundColor: colors.profileScreenBackgroundBlue,
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: { width: 100, height: 100, borderRadius: 50 },
  userDetails: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetailsHeaderView: {
    backgroundColor: colors.splashScreenBackground,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  profileDetailsHeaderText: { fontFamily: fontFamily.OxygenBold, fontSize: 18 },
  profileDetailsView: {
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  profileDetailsInnerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Distributes space between the label and value
    marginBottom: 20,
    alignItems: 'center',
  },
  profileDetailsTitleText: { width: '40%', fontFamily: fontFamily.OxygenBold },
});
