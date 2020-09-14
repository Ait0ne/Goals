import {StyleSheet} from 'react-native';


export const styles = StyleSheet.create({
    dayContainer: {
        flexDirection: 'row',
        height: 60,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1434A8',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10
    },
    dateContainer: {
        flex:1,
        height: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    dayOfTheWeek: {
        color: '#958D8D',
        fontSize: 18
    },
    date: {
        color: '#958D8D',
        fontSize: 14,
        opacity: 0.7
    },
    iconsContainer: {
        flex:1.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    },
    fabContainer: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: 'center'
    },
    disabled: {
        borderColor: '#958D8D',
        backgroundColor: 'rgba(0,0,0,0.05)'
    },
    today: {
        borderWidth: 2
    }
})