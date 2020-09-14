import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 38,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    button: {
        width: 110,
        height: 55,
        borderWidth: 1,
        borderColor: '#958D8D',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonText: {
        color: '#F07E44',
        fontSize: 18,
        lineHeight: 22,
        fontWeight: "700",
    },
    FabContainer: {
        marginTop: 50
    }
})