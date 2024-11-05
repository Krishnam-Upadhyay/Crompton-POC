import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../../globals/colors';

const BasicModal = ({isModalVisible = false, children}: any) => {
  return (
    <Modal transparent visible={isModalVisible}>
      <View style={styles.overflow}>
        <View style={styles.innerContaniner}>{children}</View>
      </View>
    </Modal>
  );
};

export default BasicModal;

const styles = StyleSheet.create({
  overflow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  innerContaniner: {
    width: 150,
    height: 150,
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
