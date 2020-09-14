import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';

import CircleIcon from '../CircleIcon/circle-icon.component';
import {styles} from './legend.styles';

interface LegendProps {
    type: 'day'| 'month' | 'year'
}

const Legend: React.FC<LegendProps> = ({type}) => {
    const {width} = useWindowDimensions()
    return (
        <View style={styles.container}>
            <View style={styles.typeContainer}>
                <CircleIcon height={15} type='main' />
                <Text style={[styles.typeText, styles.orangeText]}>
                    Главное
                </Text>
            </View>
            <View style={styles.typeContainer}>
                <CircleIcon height={15} type='goal' />
                <Text style={styles.typeText}>
                    Цель
                </Text>
            </View>
            <View style={styles.typeContainer}>
                {
                    type==='day'?
                    <Text>12:00</Text>
                    :
                    <CircleIcon height={15} type='reminder' />
                }
                <Text style={styles.typeText}>
                    Напоминание
                </Text>
            </View>
        </View>
    )
}


export default Legend;