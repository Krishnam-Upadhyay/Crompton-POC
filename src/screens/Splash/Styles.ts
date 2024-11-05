import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../../globals/colors';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.splashScreenBackground,
    // paddingHorizontal: 30,
  },
  groupImage: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    marginHorizontal: 8,
   
  },
  alertImage: {
    marginHorizontal: 8,
    height:45,
    width:45,
   
  },
  errorViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap:'wrap',
  },
  errorView: {
    backgroundColor: colors.whiteColor,
    margin: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },  
  errorIcon: {
    margin: 10,
  },
  errorText: {
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    color: colors.RedColor,
  },
});
