import {StyleSheet} from 'react-native';



export const stylesWithProps = (size:number) => StyleSheet.create({
    container: {
        width: size,
        height: size,
        borderRadius: size/2,
        borderWidth:2,
        borderColor: '#F07E44',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        elevation: 3
    }
})