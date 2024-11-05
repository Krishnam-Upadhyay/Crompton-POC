import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS, {
  DocumentDirectoryPath,
  ExternalCachesDirectoryPath,
} from 'react-native-fs';
import colors from '../../globals/colors';
import BaseText from '../BaseText/BaseText';
import images from '../../globals/images';

export const Logs = () => {
  const [logFiles, setLogFiles] = useState<any>([]);
  const navigation: any = useNavigation();

  const getLogFiles = async () => {
    // setLoader({ message: '', visible: true })
    try {
      let fileData = await RNFS.readDir(
        Platform.OS === 'android'
          ? ExternalCachesDirectoryPath + '/logs'
          : DocumentDirectoryPath + '/logs',
      );

      console.log(fileData);

      setLogFiles(fileData);
      // setLoader({ message: '', visible: false })
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLogFiles();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.whiteColor}}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={{flexDirection: 'row'}}>
        {navigation.canGoBack() ? (
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                //console.log(navigation.goBack())
                navigation.goBack();
              }}>
              <Image
                source={images.backArrowIcon}
                style={{width: 20, height: 20, resizeMode: 'contain', tintColor:colors.secondary}}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <BaseText
            style={{fontSize: 20, color: colors.secondary, fontWeight: 'bold'}}>
            Logs
          </BaseText>
        </View>
      </View>
      <FlatList
        data={logFiles}
        keyExtractor={(item, index) => item.name}
        style={{marginTop: 20}}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                marginBottom: 20,
                padding: 20,
                backgroundColor: colors.screenBackgroundColor,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,0.5)',
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  onPress={async () => {
                    if (item.isFile()) {
                      let fileName = item.name;
                      let fnlPath = item.path;
                      // console.log(item)
                      // if (item.path.startsWith('file://')) {
                      console.log('TRUE FILE');
                      console.log(item.path);
                      try {
                        // let fileOutput = await RNFS.readFile(item.path, 'utf8')

                        navigation.navigate('LogsDetails', {fileName, fnlPath});
                        // console.log(fileOutput)
                      } catch (err) {
                        console.log('In Error');
                        console.log(err);
                      }
                      // } else {
                      //   console.log('item: ', item)
                      // }

                      // RNFS.readFile(item, 'utf8')
                    }
                  }}>
                  <BaseText style={{color: 'black'}}>{item.name}</BaseText>
                </TouchableOpacity>
              </View>
              {/* <View>
                  <TouchableOpacity
                    onPress={() => {
                      Share.shareSingle({
                        title: 'Share file',
                        email: '',
                        social: Share.Social.EMAIL,
                        failOnCancel: false,
                        filename: item.name,
                        url: 'file://' + item.path,
                        subject: 'Logs File'
                      })
                        .then(res => {
                          console.log(res)
                          log.info('Sharing Log files')
                        })
                        .catch(err => {
                          console.log(err)
                          log.error(err)
                        })
  
                      // Linking.openURL(`mailto: '' ? subject=Logs File & body='file://${item.path}'`)
                    }}
                    style={{ paddingHorizontal: 10 }}>
                    <Image source={require('../../../assets/images/mail.png')} style={{ width: 20, height: 20 }} />
                  </TouchableOpacity>
                </View> */}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#f5fcff',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 6,
  },
  settingsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dff4ff',
    borderRadius: 6,
  },
  settingsLabel: {
    flex: 1,
    fontWeight: '500',
    color: 'black',
  },
  settingsValue: {
    color: 'black',
  },
});
