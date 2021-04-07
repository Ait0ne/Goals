import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation} from '@react-navigation/native';


const SearchIcon: React.FC = () => {
    const navigation = useNavigation()

    const openSearchModal = () => {
        navigation.navigate('searchModal')
    }
    
    return (
        <Icon  
        name='search' 
        size={30} 
        color={'#F07E44'}
        onPress={openSearchModal}
        />
    )
}

export default SearchIcon;