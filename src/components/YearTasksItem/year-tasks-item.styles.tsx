import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    monthContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F07E44',
        borderWidth: 1,
    },
    disabled: {
        borderColor: '#6D6969',
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    current: {
        borderWidth: 3
    },
    monthName: {
        color: '#6D6969',
        fontSize: 18,
        fontFamily: 'Bai Jamjuree'
    },
    count: {
        fontSize: 12,
        position: 'absolute',
        bottom: 8,
        right: 12
    }, 
    container: {
        flexBasis: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 33
    }
})
