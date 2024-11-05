import {
  AppState,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseText from '../../components/BaseText/BaseText';
import {useDispatch, useSelector} from 'react-redux';
import {
  homePageCategoryFilter,
  homePageDetails,
  homePageStatusFilter,
  userDetails,
} from '../../redux/selectors/selectors';

import {setHomePageData} from '../../redux/features/Slices/homePageData';
import CardView from '../../components/Card/CardView';
import CircularProgressView from '../../components/CircularProgressView/CircularProgressView';
import images from '../../globals/images';
import fontSize from '../../globals/fontSize';
import fontFamily from '../../globals/fontFamily';
import colors from '../../globals/colors';
import {ApiCall} from '../../Helpers/Network/ApiCall';
import API from '../../globals/API';
import {FlashList} from '@shopify/flash-list';
import {setNotificationCount} from '../../redux/features/Slices/notificationCount';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';

const increaseByCount = 10;

const HomePageFlatList = () => {
  const [startCount, setStartCount] = useState<number>(0);
  const [canTriggerEndReached, setCanTriggerEndReached] = useState(false);

  const homePageData = useSelector(homePageDetails);
  const userData = useSelector(userDetails);
  const statusFilter = useSelector(homePageStatusFilter);
  const categoryFilter = useSelector(homePageCategoryFilter);

  const dispatch = useDispatch<any>();

  const globalLoaderEnable = () => dispatch(setGlobalLoaderEnable());
  const globalLoaderDisable = () => dispatch(setGlobalLoaderDisable());
  const setHomePageDataAction = (data: any) => dispatch(setHomePageData(data));

  //for navigation
  const navigation = useNavigation<any>();

  // useEffect(() => {
  //   callHomePageApi(0);
  // }, []);

  /*   useEffect(() => {
    // console.log('statusFilter: ', statusFilter);
    // console.log('categoryFilter: ', categoryFilter);
    
  }, [statusFilter, categoryFilter]); */

  useFocusEffect(
    React.useCallback(() => {
      setCanTriggerEndReached(false);
      setStartCount(0);
      globalLoaderEnable();
      const timer = setTimeout(async () => {
        await callHomePageApi(0, statusFilter, categoryFilter);
      }, 100);
      return () => clearTimeout(timer);
    }, [statusFilter, categoryFilter]),
  );

  const callHomePageApi = async (
    startCount: number,
    StatusIds = null,
    AlertConfigIds = null,
  ) => {
    console.log('Inside callHomePageApi');
    // console.log('startCount: ', startCount, typeof startCount);
    // console.log('StatusIds: ', StatusIds, typeof StatusIds);
    // console.log('AlertConfigIds: ', AlertConfigIds, typeof AlertConfigIds);
    try {
      const reqData = JSON.stringify({
        UserId: userData.UserId,
        StatusIds: StatusIds,
        AlertConfigIds: AlertConfigIds,
        Start: startCount,
      });
      // console.log('reqData: ', reqData);
      const result = await ApiCall(API.GetHomePageData, reqData);

      console.log('result: ', JSON.stringify(result.data));
      if (result && result.message.toLowerCase() == 'ok' && result.data) {
        const userAlertData = result?.data?.UserAlerts;
        let finalData = userAlertData;
        if (startCount != 0) {
          // setAlertData(userAlertData);
          // dispatch(setHomePageData(userAlertData));
          finalData = [...homePageData, ...userAlertData];
        }
        setHomePageDataAction(finalData);
        console.log(
          'result?.data?.TotalNotificationCount: ',
          result?.data?.TotalNotificationCount,
        );
        dispatch(setNotificationCount(result?.data?.TotalNotificationCount));
      }
    } catch (err) {
      console.log(' err: ', err);
    } finally {
      setCanTriggerEndReached(false);
      globalLoaderDisable();
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // console.log('offsetY: ', offsetY);
    if (offsetY > 0) {
      setCanTriggerEndReached(true);
    }
  };

  const onEndReached = async () => {
    // console.log('homePageData.length: ', homePageData.length);
    if (homePageData.length >= increaseByCount) {
      // console.log('canTriggerEndReached: ', canTriggerEndReached);
      const newCount = startCount + increaseByCount;
      // console.log('newCount: ', newCount);
      // console.log('statusFilter: ', statusFilter);
      // console.log('categoryFilter: ', categoryFilter);
      setStartCount(newCount);
      globalLoaderEnable();
      const timer = setTimeout(async () => {
        await callHomePageApi(newCount, statusFilter, categoryFilter);
      }, 100);
      return () => clearTimeout(timer);
      // await callHomePageApi(newCount, statusFilter, categoryFilter);
    }
  };

  const handleOnCardClickClick = (item: any) => {
    console.log('cardClick', item.Id);
    const CardDetails = homePageData.find((card: any) => card.Id == item.Id);

    navigation.navigate('BehaviourEdit', {
      BehaviourDescription: CardDetails.Description,
      Icon: CardDetails.Icon,
      Color: CardDetails.Color,
      BehaviourName: CardDetails.Name,
      isCreate: false,
      Id: item.Id,
    });
  };

  const cardRenderItem = ({item, index}: any) => {
    return (
      <View style={{flex: 1, alignItems: 'center'}} key={index}>
        <TouchableOpacity onPress={() => handleOnCardClickClick(item)}>
          <CardView>
            {item.IsDropped ? <View style={styles.alertCardNewNoti} /> : null}
            <View style={styles.alertCardInnerView}>
              <View style={styles.alertIconAndTitle}>
                <Image
                  source={images?.[item.Icon]}
                  style={{marginRight: 10, height: 40, width: 40}}
                  resizeMode="contain"
                />
                <BaseText style={{...styles.alertTitle, color: item.Color}}>
                  {item?.Name}
                </BaseText>
              </View>
              <CircularProgressView
                fillNumber={item?.ProgressPercentage}
                tintColor={item?.Color}
              />
            </View>
            <BaseText style={styles.alertDesc}>{item?.Description}</BaseText>
          </CardView>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 30}}>
      {homePageData.length > 0 ? (
        <>
          <FlatList
            data={homePageData}
            // estimatedItemSize={300}
            keyExtractor={(item, index) => index.toString()}
            renderItem={cardRenderItem}
            onRefresh={() => {
              globalLoaderEnable();
              const timer = setTimeout(async () => {
                await callHomePageApi(0, statusFilter, categoryFilter);
              }, 100);
              return () => clearTimeout(timer);
              // await callHomePageApi(0, statusFilter, categoryFilter);
            }}
            refreshing={false}
            onScroll={handleScroll}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
          />
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <BaseText>No Data Found</BaseText>
        </View>
      )}
    </View>
  );
};

export default HomePageFlatList;

const styles = StyleSheet.create({
  alertCardNewNoti: {
    height: 10,
    width: 10,
    backgroundColor: colors.bellBadgeColor,
    borderRadius: 10,
    alignSelf: 'flex-end',
    bottom: 10,
    right: -10,
    position: 'relative',
    marginBottom: -15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  alertCardInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // alignSelf:'flex-start'
  },
  alertIconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  alertTitle: {
    fontSize: fontSize.font14,
    flexShrink: 1,
    marginRight: 10,
  },
  alertDesc: {
    fontSize: fontSize.font16,
    fontFamily: fontFamily.OxygenBold,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
});
