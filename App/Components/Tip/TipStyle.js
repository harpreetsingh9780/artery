import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../Theme";
const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container:{
        width: '100%',
        alignSelf: 'center',
        height: 40,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textContainer: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    selectedText: {
        backgroundColor: 'white',
        width: '95%',
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    text: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    verticalLine: {
        height: '60%',
        width: 1,
        backgroundColor: Colors.darkGray
    }
})