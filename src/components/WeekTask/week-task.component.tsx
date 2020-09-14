import React, { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {useTasks} from '../TasksProvider/tasks-provider.component';
import {styles} from './week-task.styles';
import CircleIcon from '../CircleIcon/circle-icon.component';
import AddTaskFab from '../AddTaskFab/add-task-fab.component';

interface WeekTaskProps {
    date: moment.Moment,
    dayOfTheWeek: string,
    index: number
}

const WeekTask: React.FC<WeekTaskProps> = ({date, dayOfTheWeek, index}) => {
    const [mainTasksCount, setMainTasksCount] = useState(0)
    const [goalsCount, setGoalsCount] = useState(0)
    const [reminders, setReminders] = useState(false)
    const {getTasksForTheDay, tasks} = useTasks()
    const isActiveDate = date.isSameOrAfter(moment(), 'day')
    const navigation = useNavigation()


    useEffect(()=> {
        console.log('getting tasks')
        if (isActiveDate) {
            const currentTasks = getTasksForTheDay(date.toDate())
            let goals = 0
            let mains = 0
            let reminders = 0
            currentTasks?.forEach(task=> {
                if (task.taskType==='goal') goals++
                else if (task.taskType==='main') mains++
                else if (task.taskType==='reminder') reminders++
            })
            setGoalsCount(goals)
            setMainTasksCount(mains)
            setReminders(reminders>0?true:false)
        }
    }, [tasks])

    const handleDayTasksOpen = () => {
        navigation.navigate('dailyTasksScreen', {date: date.toDate().getTime()})
    }


    return (
        <Animatable.View  
        style={[styles.dayContainer, isActiveDate? null: styles.disabled, date.isSame(moment(), 'day')? styles.today: null, {width:Dimensions.get('window').width*0.85}]}
        animation={index%2===0?'fadeInLeft': 'fadeInRight'}
        delay={index*100}
        duration={1000}
        >
            <TouchableOpacity onPress={handleDayTasksOpen} style={styles.dateContainer}>
                <Text style={styles.dayOfTheWeek}>{dayOfTheWeek}</Text>
                <Text style={styles.date}>{date.format('DD/MM/YYYY')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDayTasksOpen} style={styles.iconsContainer}>
                {
                    mainTasksCount>0? <CircleIcon count={mainTasksCount} type='main' height={26}/>:null
                }
                                {
                    goalsCount>0? <CircleIcon count={goalsCount} type='goal' height={26}/>:null
                }
                                {
                    reminders? <CircleIcon count={goalsCount} type='reminder' height={26}/>:null
                }
            </TouchableOpacity>
            <View style={styles.fabContainer}>
                {
                    isActiveDate?
                        <AddTaskFab date={date.toDate()} size={40} />
                    :null
                }
            </View>
        </Animatable.View>
    )
} 

export default WeekTask