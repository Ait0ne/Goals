import React from 'react';
import {View, FlatList, Text, Dimensions} from 'react-native';
import moment from 'moment';

import {styles} from './week-tasks-list.styles';
import WeekTask from '../WeekTask/week-task.component'

interface WeekTasksProps {
    weekStartDate: moment.Moment
}


const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


const WeekTasksList: React.FC<WeekTasksProps> = ({weekStartDate}) => {


    return (
        <View style={[styles.container, {width:Dimensions.get('window').width}]}>
            {
                days.map((day, i)=> {
                    const date = weekStartDate
                    console.log('start',date.format('DD/MM/YYYY/HH:mm'))
                    return <WeekTask dayOfTheWeek={day} key={i} date={date.clone().add(i,'d') }  index={i}/>
                })
            }
        </View>
    )
}

export default WeekTasksList;