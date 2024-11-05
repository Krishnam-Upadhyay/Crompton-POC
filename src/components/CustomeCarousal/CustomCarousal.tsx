import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  AppState,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import Config from 'react-native-config';
import images from '../../globals/images';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

const CustomCarousel = ({postMedia, currentPostId, postId}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  console.log(
    'conditionToPlay',
    postId,
    currentPostId,
    postId == currentPostId,
  );
  const videoRef = useRef<any>(null);
  const handleEnd = () => {
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
  };

  const renderItem = ({item}: any) => {
    const isVideo = item.type.startsWith('video');

    console.log('postId: ', postId);
    console.log('currentPostId: ', currentPostId);
    console.log('currentIndex: ', currentIndex);
    console.log(`${Config.WEB_URL}/${item.url}`);

    const isPlaying =
      currentIndex < postMedia.length &&
      postMedia[currentIndex].type.startsWith('video');

    console.log('currentIndex: ', currentIndex, 'isPlaying', isPlaying);
    // isPlaying ? postId !== currentPostId :
    return isVideo ? (
      <Video
        source={{uri: `${Config.WEB_URL}/${item.url}`}}
        ref={videoRef}
        style={styles.postImage}
        resizeMode="contain"
        repeat={false}
        paused={isPlaying ? postId !== currentPostId : true}
        controls
        poster={{
          source: images.logo,
          resizeMode: 'center',
          style: {width: '100%', height: '100%'},
        }}
        /*  onEnd={handleEnd} */
        controlsStyles={{
          hidePosition: false,
          hidePlayPause: false,
          hideForward: true,
          hideRewind: true,
          hideNext: true,
          hidePrevious: true,
          hideFullscreen: false,
          hideSeekBar: false,
          hideDuration: false,
          hideNavigationBarOnFullScreenMode: true,
          hideNotificationBarOnFullScreenMode: true,
          hideSettingButton: true,
          seekIncrementMS: 10000,
          liveLabel: 'LIVE',
        }}
      />
    ) : (
      <FastImage
        source={{uri: `${Config.WEB_URL}/${item.url}`}}
        style={styles.postImage}
        resizeMode="stretch"
      />
    );
  };

  return (
    <>
      <Carousel
        width={width}
        height={400}
        autoPlay={false}
        data={postMedia}
        style={{flex: 1}}
        renderItem={renderItem}
        onSnapToItem={index => {
          setCurrentIndex(index);
          setPlaying(true);
        }}
        loop={false}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
      {/* Image Indicators */}
      {postMedia?.length === 1 ? (
        <View style={{marginVertical: 5}}></View>
      ) : (
        <View style={styles.indicatorContainer}>
          {postMedia?.map((_: any, index: any) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    margin: 4,
  },
  activeIndicator: {
    backgroundColor: 'blue', // Active color
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
});

export default CustomCarousel;
