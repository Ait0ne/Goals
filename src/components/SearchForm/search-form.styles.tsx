import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width

export const styles = StyleSheet.create({
    container: {
        width: width,
        height: 200,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    input: {
        width: width*0.75,
        height: 50,
        borderRadius: 25,
        borderColor: '#F07E44',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        
    },
    searchButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F07E44',
        justifyContent: "center",
        alignItems: 'center',
        marginLeft: 10,
        elevation: 1
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})