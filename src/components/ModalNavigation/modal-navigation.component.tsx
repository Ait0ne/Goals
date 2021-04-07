import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {styles} from './modal-navigation.styles';
import CloseIcon from '../CloseIcon/close-icon.component';

interface ModalNavigationProps {
    closeIcon?:boolean,
    submitIcon?:boolean,
    handleSubmit?: () => void
}


const ModalNavigation: React.FC<ModalNavigationProps> = ({closeIcon, submitIcon, handleSubmit}) => {
    return (
        <View style={styles.navigation}>
            {
                closeIcon?
                <CloseIcon />
                :null
            }
            {
                submitIcon&&handleSubmit?
                <Icon onPress={handleSubmit} name='check' size={35} color='#F07E44'/> 
                : null
            }
        </View>
    )
}


export default ModalNavigation