import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Theme";
const { width } = Dimensions.get('window')

export default StyleSheet.create({
    header:{
        backgroundColor: Colors.darkGray, 
        padding: 15, 
        justifyContent: 'center',
        marginBottom: 5,
        width: width,
        marginLeft: -20
    }
})