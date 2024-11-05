import { Dimensions, StyleSheet } from "react-native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
export default  StyleSheet.create({
    pop_up_loader: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
})