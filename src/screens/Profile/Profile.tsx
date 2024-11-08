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
import React, {useEffect, useState} from 'react';
import colors from '../../globals/colors';
import BaseText from '../../components/BaseText/BaseText';
import fontFamily from '../../globals/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import {azureAuthData, userDetails} from '../../redux/selectors/selectors';
import moment from 'moment';
import {GetProfilePic} from '../../components/CommonComponents/CommonComponents';
import ButtonView from '../../components/ButtonView/ButtonView';
import {logoutUser} from '../../Helpers/CommonFunctions/CommonFunctions';
import images from '../../globals/images';
import DeviceInfo from 'react-native-device-info';
import fontSize from '../../globals/fontSize';
import {useNavigation} from '@react-navigation/native';
import {ApiCall} from '../../Helpers/Network/ApiCall';
import API from '../../globals/API';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';
import {setLoginDetails} from '../../redux/features/Slices/loginDetailsSlice';

const Profile = () => {
  const userData = useSelector(userDetails);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // console.log('userData: ', userData);

  const userDetailsKeys = [
    {id: 1, key: 'Name', fontSize: 20},
    {id: 2, key: 'Designation', fontSize: 16},
    {id: 3, key: 'DeptName', fontSize: 16},
  ];
  const azureAdData = useSelector(azureAuthData);
  const requiredDataKeys = [
    {label: 'User ID', key: 'PId', value: azureAdData?.userId},
    {label: 'User Name', key: 'ManagerId', value: azureAdData?.userName},
  ];

  const logoutUserFunction = async () => {
    dispatch(setLoginDetails([]));
    await logoutUser();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.viewContainer}>
        <View style={styles.profileBio}>
          {navigation.canGoBack() ? (
            <View
              style={{
                position: 'absolute',
                top: 20,
                left: 10,
                marginLeft: 10,
                zIndex: 1,
              }}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  console.log('navigation: ', navigation);
                  navigation.goBack();
                }}>
                <Image
                  source={images.backArrowIcon}
                  style={{width: 25, height: 25, resizeMode: 'contain'}}
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <Text
                style={{
                  color: colors.whiteColor,
                  fontSize: fontSize.font24,
                  fontWeight: 'bold',
                }}>
                {azureAdData?.userName}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.screenBackgroundColor,
          bottom: 10,
        }}>
        <ButtonView
          viewStyle={{backgroundColor: '#2652E9'}}
          title="Logout"
          onPress={logoutUserFunction}
        />
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
    backgroundColor: '#2652E9',
    width: '100%',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {width: 100, height: 100, borderRadius: 50},
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
  profileDetailsHeaderText: {fontFamily: fontFamily.OxygenBold, fontSize: 18},
  profileDetailsView: {
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  profileDetailsInnerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Distributes space between the label and value
    marginBottom: 20,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  profileDetailsTitleText: {
    marginHorizontal: 10,
    fontFamily: fontFamily.OxygenBold,
  },
});
