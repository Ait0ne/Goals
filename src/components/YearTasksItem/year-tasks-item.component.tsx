import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';


import {styles} from './year-tasks-item.styles';

interface YearTasksItemProps {
    taskInfo: {
        date: string,
        count: number
    } ,
    index: number
}

const YearTasks: React.FC<YearTasksItemProps> = ({taskInfo, index}) => {
    const isActive = moment(new Date(taskInfo.date)).isSameOrAfter(moment(),'month')
    const isThisMonth = moment(new Date(taskInfo.date)).isSame(moment(),'month')
    const navigation = useNavigation()

    const handleMonthOpen = () => {
        const time = moment(new Date(taskInfo.date)).add(1,'day').toDate().getTime()
        navigation.navigate('monthTasksScreen', {date: time})
    }

    return (
        <Animatable.View animation='flipInY' delay={index*50} style={styles.container}>
            <TouchableOpacity onPress={handleMonthOpen} style={[styles.monthContainer, !isActive? styles.disabled: null, isThisMonth? styles.current: null]}>
                <Text style={styles.monthName}>{moment(new Date(taskInfo.date)).format('MMM')}</Text>
                {
                    taskInfo.count>0?
                    <Text style={styles.count}>{taskInfo.count}</Text>
                    :null
                }
            </TouchableOpacity>
        </Animatable.View>
    )
}

export default YearTasks;