import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';


const CloseIcon: React.FC = () => {
    const navigation = useNavigation()


    const handleClose = () => {
        navigation.goBack()
    }

    return (
        <Icon onPress={handleClose} name='close' size={35} color='#F07E44'/>
    )
}

export default CloseIcon;