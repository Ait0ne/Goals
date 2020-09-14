import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 50
    },
    selectedOption: {
        borderBottomColor: '#F07E44',
        borderBottomWidth: 1,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    alignFlexStart: {
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        marginRight: 8,
    },
    orangeText: {
        color: '#F07E44',
    },
    dailyOptions: {
        flexDirection: 'row',
        marginVertical: 30
    },
    header: {
        fontSize: 20,
        color: '#F07E44',
    },
    subheader: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 5,
        borderBottomColor: '#F07E44',
        borderBottomWidth: 1,
    },
    date: {
        fontSize: 18
    }
})