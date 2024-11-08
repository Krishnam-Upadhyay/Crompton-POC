import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Get screen dimensions for modal responsiveness
const {width, height} = Dimensions.get('window');

const CustomModal = ({
  isVisible,
  onClose,
  title,
  content,
  footer,
  onBackdropPress,
}: any) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.overlay} onTouchEnd={onBackdropPress}>
        <View style={styles.modalContainer}>
          {/* Modal Header (Title) */}
          {title && (
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
          )}

          {/* Modal Content */}
          <View style={styles.modalContent}>{content}</View>

          {/* Modal Footer (Buttons) */}
          {footer && <View style={styles.modalFooter}>{footer}</View>}

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background overlay
  },
  modalContainer: {
    width: width * 0.8, // Responsive width
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Drop shadow for Android
  },
  modalHeader: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomModal;
