import React from 'react';
import {View, Text, Image} from 'react-native';

import {styles} from './logo.styles';


const Logo: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                G
                <Image 
                source={require('./clock.png')}
                style={styles.icon}
                />
                ALS
            </Text>            
        </View>
    )
}




export default Logo