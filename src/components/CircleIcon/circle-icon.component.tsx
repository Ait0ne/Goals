import React from 'react';

import {stylesWithProps} from './circle-icon.styles';
import { View, Text } from 'react-native';

interface CircleIconProps {
    type: 'main'|'reminder'| 'goal',
    height: number,
    count?: number
}

const CircleIcon: React.FC<CircleIconProps> = ({type, height, count}) => {
    const styles = stylesWithProps(height, type)

    return (
        <View style={styles.container}>
            {

                type==='reminder'?
                <Text style={styles.text}>
                    R
                </Text>
                :
                count?
                <Text style={styles.text}>{count}</Text>
                :
                <Text style={styles.text}>{type==='goal' ? '1': ''}</Text>
            }
        </View>

    )
}

export default CircleIcon;