import {StyleSheet} from 'react-native'

export const stylesWithProps =  (height: number, type: 'main'|'reminder'| 'goal') => StyleSheet.create({
    container: {
        height:height,
        width:height,
        backgroundColor: type==='main'? '#F07E44': '#ffffff',
        borderWidth: type==='main'? 0 : 1,
        borderRadius: height/2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 2,
        marginLeft: 5
    },
    text: {
        color: type==='reminder'? '#F07E44': '#000000',
        fontSize: height-5
    }
})