import React from 'react';
import {View} from 'react-native';

import SearchIcon from '../SearchIcon/search-icon.component';
import {styles} from './header.styles';



const Header: React.FC = () => {
    return (
        <View style={styles.headerContainer}>
            <SearchIcon />
        </View>
    )
}


export default Header;