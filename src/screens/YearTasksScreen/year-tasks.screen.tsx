import React, { useEffect, useState } from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import moment from 'moment';

import {useTasks} from '../../components/TasksProvider/tasks-provider.component';
import {styles} from './year-tasks.styles';
import { Task } from '../../schemas/task.schema';
import YearTasks from '../../components/YearTasks/year-tasks.component';


let monthTasks = new Map<string, number>()
const startOfTheYear = moment().startOf('year')
for (let i=0; i<24; i++ ) {
    monthTasks.set(startOfTheYear.clone().add(i, 'month').local().startOf('month').toString(),0)
}




const YearTasksScreen: React.FC = () => {
    const {tasks} = useTasks()
    const [tasksForEveryMonth, setTasksForEveryMonth] = useState<{date:string, count:number}[]>([])

    console.log(startOfTheYear)
    useEffect(() => {
        let keys = [...monthTasks.keys()];
        // console.log(keys);
        // keys.forEach(key => {
        //     monthTasks.set(key, monthTasks.get(key)as number +1)
        // })
        // console.log(monthTasks)
        (tasks as Task[])?.forEach((task)=> {
            if (['day','month','week'].includes(task.notificationRepeatType)) {
                keys.forEach(key => {
                    if (moment(new Date(key)).isSameOrAfter(moment(), 'month')) {
                        monthTasks.set(key, monthTasks.get(key)as number +1)
                    }
                })
            } else if (task.notificationRepeatType==='year') {
                keys.forEach(key => {
                    if (moment(new Date(key)).month()===task.date.getMonth()&&moment(key).isSameOrAfter(moment(), 'month')) {
                        monthTasks.set(key, monthTasks.get(key) as number +1)
                    }
                })
            } else {
                
                monthTasks.set(moment(new Date(task.date)).clone().local().startOf('month').toString(), monthTasks.get(moment(new Date(task.date)).clone().local().startOf('month').toString()) as number + 1)
            }
        })
        const newMonthTasks: {date:string, count: number}[] = []
        keys.forEach(key => {
            newMonthTasks.push({date:key, count:monthTasks.get(key) as number})  
            monthTasks.set(key, 0)
        })
        setTasksForEveryMonth(newMonthTasks)

    }, [tasks])

    return (
        <View>
            <Image 
            source={require('../DailyTasks/goals.png')}
            style={styles.logo}
            />
            <ScrollView
            horizontal={true}
            pagingEnabled={true}
            >
                <YearTasks tasksInfo={tasksForEveryMonth.slice(0,12)} title='This Year' />
                <YearTasks tasksInfo={tasksForEveryMonth.slice(12,24)} title='Next Year'/>
            </ScrollView>
        </View>
)}

export default YearTasksScreen;
