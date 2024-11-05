import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import styles from './Styles';

import {DrawerActions, useNavigation} from '@react-navigation/native';
import AzureAuth from 'react-native-azure-auth';
import AzureAuthConfig from '../../config/AzureAuthConfig';
import {setAuthData} from '../../redux/features/Slices/azureAdDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {azureAuthData} from '../../redux/selectors/selectors';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const azureAdData = useSelector(azureAuthData);

  // console.log("azureAdDataRedux: ", azureAdData)

  const callAzureLogin = async () => {
    try {
      const authResult = await AzureAuthConfig.webAuth.authorize({
        scope: 'openid profile User.Read Mail.Read',
      });
      if (authResult) {
        const userData = {
          accessToken: authResult.accessToken,
          expireOn: authResult.expireOn,
          userId: authResult.userId,
          userName: authResult.userName,
        };
        console.log('Auth Result:', userData);
        dispatch(setAuthData(userData));
      } else {
        Alert.alert('Failed to login with Azure Ad');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={callAzureLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Login;
