import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Vibration,
} from 'react-native';
import {StyleSheet} from 'react-native';
import BaseText from '../BaseText/BaseText';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import {Portal} from '@gorhom/portal';
import colors from '../../globals/colors';
import fontFamily from '../../globals/fontFamily';
import fontSize from '../../globals/fontSize';
import Card from '../Card/Card';
import CardView from '../Card/CardView';
import {useDispatch, useSelector} from 'react-redux';
import {
  bottomSheetVisibility,
  checkIsHomeScreenCheckboxCleared,
  homePageCategoryFilter,
  homePageDetails,
  homePageStatusFilter,
  locationBottomSheetVisibility,
  masterDetails,
  userDetails,
} from '../../redux/selectors/selectors';
import {
  setBottomSheetDisable,
  setBottomSheetEnable,
} from '../../redux/features/Slices/bottomSheetViewSlice';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import ButtonView from '../ButtonView/ButtonView';
import {ApiCall} from '../../Helpers/Network/ApiCall';
import API from '../../globals/API';
import {
  setGlobalLoaderDisable,
  setGlobalLoaderEnable,
} from '../../redux/features/Slices/loaderSlice';
import {setHomePageData} from '../../redux/features/Slices/homePageData';
import {
  setCategoryFilter,
  setIsFiltersCheckboxCleared,
  setStatusFilter,
} from '../../redux/features/Slices/homePageFilters';
import {useIsFocused} from '@react-navigation/native';
import images from '../../globals/images';
import {
  clearSelectedLocations,
  setLocationBottomSheetDisable,
  setselectedLocations,
} from '../../redux/features/Slices/locationBottomSheetSlice';

interface Item {
  id: number;
  name: string;
  isChecked: boolean;
}

const LocationBottomFilter = ({isFocused}: any) => {
  const sheetVisible = useSelector(locationBottomSheetVisibility);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const dispatch = useDispatch();

  // variables
  const snapPoints = useMemo(() => ['25%', '75%'], []);

  const [checkBoxData, setCheckBoxData] = useState<any>([
    {
      id: 1,
      title: 'Location',
      key: 'location',
      checkBoxList: [],
    },
  ]);

  const [errorString, setErrorString] = useState<string>('');

  const masterData = useSelector(masterDetails);

  const userData = useSelector(userDetails);

  const homePageData = useSelector(homePageDetails);

  const globalLoaderEnable = () => dispatch(setGlobalLoaderEnable());
  const globalLoaderDisable = () => dispatch(setGlobalLoaderDisable());

  const isCheckboxCleared = useSelector(checkIsHomeScreenCheckboxCleared);

  useEffect(() => {
    // callCategoryFilterListApi();\
    setMasteDataCheckBox();
  }, []);

  useEffect(() => {
    if (sheetVisible) {
      bottomSheetModalRef?.current?.present();
    } else {
      bottomSheetModalRef?.current?.dismiss();
    }
  }, [sheetVisible]);

  /*   useEffect(() => {
    if (isCheckboxCleared) {
      resetFilters();
    }
  }, [isCheckboxCleared]); */

  useEffect(() => {
    if (!isFocused) {
      resetFilters();
    }
  }, [isFocused]);
  const resetFilters = () => {
    setMasteDataCheckBox();
  };
  //console.log('MasterDataFOrOptions', masterData);
  const setMasteDataCheckBox = () => {
    if (masterData && masterData.Location) {
      insertIntoCheckBoxData('location', masterData.Location);
    }
  };

  const insertIntoCheckBoxData = (key: string, data: any) => {
    // console.log("data: ", data)
    let tempData = checkBoxData;
    tempData.forEach((item: any) => {
      if (item.key === key) {
        let tempData = [];
        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          tempData.push({
            id: element.Id,
            name: element.Name,
            isChecked: false,
          });

          item.checkBoxList = tempData;
        }
      }
    });
    // console.log('tempData: ', tempData);
    setErrorString('');
    setCheckBoxData(tempData);
  };

  const closeModal = () => {
    console.log('checkbox data: ', JSON.stringify(checkBoxData));
    const selectedLocation = checkBoxData
      .find((section: any) => section.key === 'location')
      .checkBoxList.filter((checkBox: any) => checkBox.isChecked)
      .map((checkBox: any) => checkBox.id);

    console.log('selectedLocation', selectedLocation);

    if (selectedLocation.length >= 1) {
      dispatch(setselectedLocations(selectedLocation));
      dispatch(setLocationBottomSheetDisable());
      setErrorString('');
    } else {
      setErrorString('Select atleast 1 filter');
      if (!errorString) {
        Vibration.vibrate();
      }
    }

    // let status=0
    /*   const checkValidation = checkFilterValidation();
    if (checkValidation) {
      dispatch(setBottomSheetDisable());

      const selectedStatus = checkBoxData
        .find((section: any) => section.key === 'status')
        .checkBoxList.filter((checkBox: any) => checkBox.isChecked)
        .map((checkBox: any) => checkBox.id);

      const selectedCategory = checkBoxData
        .find((section: any) => section.key === 'category')
        .checkBoxList.filter((checkBox: any) => checkBox.isChecked)
        .map((checkBox: any) => checkBox.id);

      // await callHomePageApi(
      //   0,
      //   selectedStatus.toString() || null,
      //   selectedCategory.toString() || null,
      // );
      dispatch(setStatusFilter(selectedStatus.toString() || null));
      dispatch(setCategoryFilter(selectedCategory.toString() || null));
      setCheckboxCleared(false);
    } else {
      setErrorString('Select atleast 1 filter');
      if (!errorString) {
        Vibration.vibrate();
      }
    } */
  };

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const onCheckBoxClick = (categoryId: number, checkboxId: number) => {
    //   console.log('onCheckBoxCLick', categoryId, checkboxId);
    let tempData = checkBoxData.map((category: any) => {
      return category.id === categoryId
        ? {
            ...category,
            checkBoxList: category.checkBoxList.map((item: any) => {
              return item.id === checkboxId
                ? {...item, isChecked: !item.isChecked}
                : item;
            }),
          }
        : category;
    });
    //   console.log('tempData', tempData);
    setErrorString('');
    setCheckBoxData(tempData);
  };

  const renderItem = ({item}: any) => {
    return (
      <CardView>
        {item.checkBoxList.map((cbl: any, index: number) => {
          return (
            <View key={index}>
              <CustomCheckbox
                name={cbl.name}
                onCheckBoxClick={() => onCheckBoxClick(item.id, cbl.id)}
                isChecked={cbl.isChecked}
                isError={errorString}
              />
            </View>
          );
        })}
      </CardView>
    );
  };

  const FooterComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: Platform.OS == 'ios' ? 20 : 0,
        }}>
        <ButtonView
          title="Reset"
          onPress={() => {
            dispatch(setLocationBottomSheetDisable());
            dispatch(clearSelectedLocations());
            resetFilters();
          }}
        />
        <ButtonView title="Apply" onPress={closeModal} />
      </View>
    );
  };

  const CustomCheckBoxView = () => {
    return (
      <BottomSheetFlatList
        data={checkBoxData}
        keyExtractor={(data, index) => index.toString()}
        renderItem={renderItem}
        // ListFooterComponent={FooterComponent}
      />
    );
  };

  return (
    <Portal>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          enableContentPanningGesture={false}
          snapPoints={snapPoints}
          onChange={() => console.log('click')}
          backgroundStyle={{
            backgroundColor: colors.addBehaviourBackGroundColor,
          }}
          handleStyle={{borderRadius: 20}}
          handleIndicatorStyle={{backgroundColor: colors.lightGrey, width: 50}}
          enableHandlePanningGesture={false}
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.7} // Controls the opacity of the background
              // appearsOnIndex={0}
              // disappearsOnIndex={-1}
              pressBehavior={'none'}
            />
          )}>
          <BottomSheetView style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <View style={{flex: 1}}></View>
              <View
                style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                <BaseText style={styles.filterText}>Location</BaseText>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    console.log('Cross pressed');

                    dispatch(setLocationBottomSheetDisable());
                  }}>
                  <Image
                    source={images.headerCloseIcon}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: colors.blackColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <CustomCheckBoxView />
            </View>

            {errorString ? (
              <BaseText
                style={{
                  color: 'red',
                  textAlign: 'center',
                  fontWeight: 'regular',
                }}>
                {errorString}
              </BaseText>
            ) : null}
          </BottomSheetView>
          <FooterComponent />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  filterText: {
    fontFamily: fontFamily.OxygenBold,
    fontSize: fontSize.font24,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: fontSize.font16,
    fontFamily: fontFamily.OxygenBold,
  },
  cardCheckBoxView: {
    height: 1,
    width: '100%',
    backgroundColor: colors.lightGrey,
    marginVertical: 10,
  },
});

export default LocationBottomFilter;
