import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginHorizontal: 0,
        padding:0,
        overflow: 'visible'
    },
    input: {
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 37,
        width:'80%',
        maxHeight: 100,

    },
    button: {
        padding:0,
        height: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,
        width:90
    },

    buttonsContainer: {
        backgroundColor: 'transparent',
        padding:0,
        borderWidth:0
    },
    buttonText: {
        marginLeft: 5
    },
    buttonMainText: {
        color: '#F07E44'
    },
    selectedButton: {
        borderWidth: 0,
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        borderBottomColor: '#F07E44'
    },
    option: {
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        width: 0
    
    },
    bContainer: {
        padding:0,
    }
})