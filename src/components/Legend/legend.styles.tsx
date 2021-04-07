import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 35,
        left: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    typeText: {
        marginLeft: 2,
        fontSize: 10,
        opacity: 0.5
    },
    orangeText: {
        color: '#F07E44'
    }
})