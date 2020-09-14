import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    screenContainer: {
        paddingTop: 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        position: 'absolute',
        top: 0,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#F07E44'
    },
    header: {
        color: '#F07E44',
        fontSize: 20,
        marginBottom: 30
    } ,
    disabled: {
        color: '#958D8D'
    }   
})