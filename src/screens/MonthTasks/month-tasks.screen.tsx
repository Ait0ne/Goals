import React, {useState, useEffect} from 'react';
import {View,  Image, StyleSheet, useWindowDimensions} from 'react-native';
import {MultiDotMarking, DateObject, CalendarList} from 'react-native-calendars';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';


import Legend from '../../components/Legend/legend.component';
import {styles} from './month-tasks.styles';
import {useTasks} from '../../components/TasksProvider/tasks-provider.component';

import { Task } from '../../schemas/task.schema';



type RouteProps = {
    monthTasksScreen: {
        date: number
    }
}


const MonthTasksScreen: React.FC = () => {
    const {params} = useRoute<RouteProp<RouteProps, 'monthTasksScreen'>>()
    const currentMonth = moment(params.date)
    const {tasks} = useTasks()
    const minDate = currentMonth.clone().subtract(6, 'month')
    const maxDate = currentMonth.clone().add(18, 'month')
    const [markedDates, setMarkedDates] = useState<{
        [date: string]: MultiDotMarking;
    }>()
    const navigation = useNavigation()
    const {width} = useWindowDimensions()

    const main = {key: 'main', color: '#F07E44'} 
    const goal = {key: 'goal', color: '#958D8D'}
    const reminder = {key: 'reminder', color: '#ffffff'}

    console.log('month', params)


    useEffect(()=> {
        let dates:{[date:string]:MultiDotMarking} = {}; 
        
        const pushDate = (date:Date, taskType: "main" | "goal" | "reminder") => {
            if (!dates[moment(date).format('YYYY-MM-DD')]) {
                dates = {...dates, [moment(date).format('YYYY-MM-DD')]: {dots: [taskType==='main'? main: taskType==='goal'? goal: reminder]}}
            } else if (!dates[moment(date).format('YYYY-MM-DD')].dots.includes(taskType==='main'? main: taskType==='goal'? goal: reminder)) {
                dates[moment(date).format('YYYY-MM-DD')].dots.push(taskType==='main'? main: taskType==='goal'? goal: reminder)
            }
        }


        (tasks as Task[])?.forEach((task)=> {
            if (moment(task.date).isSame(currentMonth, 'month')||(task.notificationRepeatType==='month'||'day')||(task.notificationRepeatType==='year'&&task.date.getMonth()===currentMonth.month())) {

                if (task.notificationRepeatType ==='year') {
                    pushDate(moment(task.date).clone().add(1, 'year').toDate(), task.taskType)
                    pushDate(moment(task.date).clone().add(2, 'year').toDate(), task.taskType)
                    pushDate(moment(task.date).toDate(), task.taskType)
                } else if (task.notificationRepeatType==='month') {
                    for (let index = 0; index < 24; index++) {
                        pushDate(moment(task.date).clone().add(index,'month').toDate(), task.taskType)
                    }
                } else if  (task.notificationRepeatType==='week') {
                    for (let index = 0; index < 104; index++) {
                        pushDate(moment(task.date).clone().add(index,'week').toDate(), task.taskType)
                    }
                } else if (task.notificationRepeatType==='day') {
                    for (let index = 0; index < 731; index++) {
                        pushDate(moment(task.date).clone().add(index,'day').toDate(), task.taskType)
                    }
                } else {
                    pushDate(task.date,task.taskType)
                }
            }
        })
        setMarkedDates(dates)
    },  [tasks])


    const handleDayPress = (day:DateObject) => {
        navigation.navigate('dailyTasksScreen', {date: moment(day.dateString).toDate().getTime()})
    }


    return (
        <View style={styles.container}>
            <Image 
            source={require('../DailyTasks/goals.png')}
            style={styles.logo}
            />
            <Animatable.View
            animation='lightSpeedIn'>
            <CalendarList
            current={currentMonth.toString()}
            minDate={minDate.toString()}
            maxDate={maxDate.toString()}
            firstDay={1}
            // enableSwipeMonths={true}
            hideExtraDays={true}
            markingType='multi-dot'
            markedDates={markedDates?markedDates: {}}
            horizontal={true}
            pagingEnabled={true}
            calendarWidth = {width}
            onDayPress={handleDayPress}
            style={styles.calendarContainer}
            theme={{
                backgroundColor: 'transparent',
                calendarBackground: 'transparent',
                selectedDayBackgroundColor: 'red',
                textDayFontFamily: 'Bai Jamjuree',
                textDayFontSize: 26,
                dayTextColor: '#6D6969',
                todayTextColor: '#F07E44',
                textMonthFontFamily: 'Bai Jamjuree',
                textMonthFontSize: 25,
                arrowColor: '#F07E44',
                monthTextColor: '#6D6969',
                'stylesheet.calendar.header': {
                    dayHeader: {
                        borderColor: '#F07E44',
                        borderRadius: 10,
                        borderWidth: 1,
                        padding: 2,
                        width: 35,
                        height: 20,
                        fontSize: 13,
                        fontFamily: 'Bai Jamjuree',
                        color: 'rgba(0,0,0,0.4)',
                        marginTop: 2,
                        marginBottom: 7,
                        textAlign: 'center',
                    },
                    week: {
                        marginTop: 55,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 10
                    }
                },
                'stylesheet.calendar.main': {
                    week: {
                        marginTop: 15,
                        marginBottom: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                      },
                },
                'stylesheet.day.multiDot': {
                    dot: {
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: 'rgba(0,0,0,0.2)',
                        marginTop: 1,
                        marginLeft: 1,
                        marginRight: 1,
                        borderRadius: 3,
                        opacity: 0,
                        width: 6,
                        height: 6,
                    }
                }
                
            }}
            />
            </Animatable.View>

            <Legend type='month'/>
        </View>
    )
}

export default MonthTasksScreen;