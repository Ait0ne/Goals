import { relativeTimeRounding } from 'moment';
import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height


export const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingTop: 52,
        minHeight: height
    },
    headerContainer: {
        width: '100%',
        height: 100,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        position: 'absolute',
        top: 19,
        left: 21
    }, 
    header: {
        color: '#958D8D',
        fontSize: 25
    } ,
    clock: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    itemContainer: {
        width: '100%',
        minHeight: 40,
        flexDirection:'row',
        marginBottom: 20
    },
    timeContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    time: {
        fontSize: 16,
        color: '#605A5A'
    },
    textContainer: {
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#605A5A',
        
    },
    orangeText: {
        color: '#F07E44'
    },
    checkIconContainer: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    list: {
        height: height - 200,
        flexGrow: 0
    },
    fabContainer: {
        position: 'absolute',
        right: 31,
        bottom: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    crossOutLine: {
        height: 1,
        backgroundColor: '#000000',
        position: "absolute",
        top: '50%',
        left: '5%'
    }
})