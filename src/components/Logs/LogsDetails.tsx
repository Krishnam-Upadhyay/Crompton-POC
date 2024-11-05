import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS, {ExternalCachesDirectoryPath} from 'react-native-fs';
import colors from '../../globals/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import {duration} from 'moment';
import Toast from 'react-native-simple-toast';
import Share, {ShareAsset} from 'react-native-share';
import {log} from '../../Helpers/CommonFunctions/FileLogger';
import images from '../../globals/images';

const LogsDetails = (props: any) => {
  const [logData, setLogData] = useState([]);
  const [copiedText, setCopiedText] = useState('');
  const [loader, setLoader] = useState({message: '', visible: false});
  const [filePath, setFilePath] = useState(props?.route?.params?.fnlPath);
  const [fileName, setFileName] = useState(props?.route?.params?.fileName);

  const copyToClipboard = () => {
    Clipboard.setString(logData);
  };

  const readLogData = async () => {
    toggleLoader(true);
    try {
      let fileOutput = await RNFS.readFile(filePath, 'utf8');
      console.log('Log length : ', fileOutput.length);
      setLogData(fileOutput);
    } catch (err) {
      console.log(err);
    }
    toggleLoader(false);
  };

  const toggleLoader = (show = true, message = '') => {
    let newLoader = {...loader};
    newLoader.visible = show;
    newLoader.message = message;
    if (show === false) {
      setTimeout(() => {
        setLoader(newLoader);
      }, 1000);
    } else {
      setLoader(newLoader);
    }
  };

  useEffect(() => {
    readLogData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.screenBackgroundColor}}>
      <View
        style={{justifyContent: 'flex-end', flexDirection: 'row', margin: 10}}>
        <View style={{marginHorizontal: 10}}>
          <TouchableOpacity
            onPress={() => {
              console.log('Copyting log text');
              log.info('Logs Copied');
              copyToClipboard();
              if (Platform.OS === 'android') {
                Toast.show('Logs Copied', Toast.SHORT, Toast.BOTTOM);
              }
            }}>
            <View>
              <Image
                source={images.copyImage}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: colors.secondary,
                  marginHorizontal: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginRight: 10}}>
          <TouchableOpacity
            onPress={() => {
              Share.open({
                title: 'Share file',
                email: '',
                social: Share.Social.EMAIL,
                failOnCancel: false,
                filename: fileName,
                url: 'file://' + filePath,
                subject: 'Logs File',
              })
                .then(res => {
                  console.log(res);
                  log.info('Sharing Log files');
                })
                .catch(err => {
                  console.log(err);
                  log.error(err);
                });
            }}>
            <View>
              <Image
                source={images.shareImage}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: colors.secondary,
                  marginHorizontal: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 10,
            borderColor: 'rgba(0,0,0,0.5)',
            borderWidth: 1,
            borderRadius: 0,
            padding: 10,
            backgroundColor: colors.whiteColor,
          }}>
          <TextInput
            multiline
            editable={false}
            contextMenuHidden
            style={{color: 'black', fontSize: 15}}>
            {logData}
          </TextInput>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={loader?.visible === true}>
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            {/* {loader?.message ? (
              <BaseText bold style={{ color: Colors.black, fontSize: 20, marginVertical: 5, textAlign: 'center' }}>
                {loader?.message}
              </BaseText>
            ) : null} */}
            <ActivityIndicator
              size={50}
              color={colors.secondary}
              style={{margin: 10}}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LogsDetails;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '50%',
    borderRadius: 10,
    borderColor: colors.blackColor,
    borderWidth: 1,
    backgroundColor: colors.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
