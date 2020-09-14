import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Bai Jamjuree',
    },
    noAccount: {
        marginTop: 10,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: 'center',
    },
    registration: {
        alignItems:"center",
        justifyContent: 'center',
        marginLeft: 5,
        height:50
    },
    registrationText: {
        color: '#F07E44',
        fontSize: 15,
        fontWeight: '600'
    },
    formsContainer: {
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'flex-start'
    }

})