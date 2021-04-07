import {StyleSheet, Dimensions} from 'react-native';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

export const styles = StyleSheet.create({
    searchModalContainer: {
        minHeight: height,
        paddingVertical: 50,
        width: width
    },
    itemContainer: {
        width: width,
        minHeight: 40,
        flexDirection:'row',
        marginBottom: 20
    },
    crossOutLine: {
        height: 1,
        backgroundColor: '#000000',
        position: "absolute",
        top: '50%',
        left: '5%'
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
    clock: {
        width: 20,
        height: 20,
        marginLeft: 5
    },
    list: {
        height: height - 250,
        flexGrow: 0
    },
    finished: {
        color: 'rgba(0,0,0,0.3)',
    }
})