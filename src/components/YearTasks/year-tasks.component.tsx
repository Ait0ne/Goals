import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';

import {styles} from './year-tasks.styles';
import YearTasksItem from '../YearTasksItem/year-tasks-item.component';

interface YearTasksProps {
    tasksInfo: {
        date: string,
        count: number
    } [],
    title:string
}

const YearTasks: React.FC<YearTasksProps> = ({tasksInfo, title}) => {
const {width, height} = useWindowDimensions()

    return (
        <View style={[{width: width, height: height}, styles.container]}>
            <Text style={styles.header}>{title}</Text>
            <View style={styles.monthsContainer}>
                {
                    tasksInfo.map((taskInfo, index) => {
                        return <YearTasksItem key={index} taskInfo={taskInfo} index={index}/>
                    })
                }
            </View>
        </View>
    )
}

export default YearTasks;