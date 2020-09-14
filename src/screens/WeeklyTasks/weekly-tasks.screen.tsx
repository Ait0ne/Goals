import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import moment from 'moment'

import {styles} from './weekly-tasks.styles';
import Legend from '../../components/Legend/legend.component';
import WeekTasksList from '../../components/WeekTasksList/week-tasks-list.component'
import { Text } from 'react-native-animatable';


const WeeklyTasksScreen:React.FC = () => {
    const start = moment().startOf('isoWeek').startOf('day')
    console.log('weekStart',start.format('DD/MM/YYYY/HH:mm'))
    return(
        <View style={{height: '100%'}}>
            <Image 
            source={require('../DailyTasks/goals.png')}
            style={styles.logo}
            />

            <ScrollView 
            horizontal={true}
            pagingEnabled={true}
            >   
                <View style={styles.weekContainer}>
                    <Text style={styles.header}>This Week</Text>
                    <WeekTasksList weekStartDate={start} />
                </View>
                <View style={styles.weekContainer}>
                    <Text style={styles.header}>Next Week</Text>
                    <WeekTasksList weekStartDate={start.clone().add(7, 'day')} />
                </View>
            </ScrollView>
            <Legend type='month'/>
        </View>
    )
}

export default WeeklyTasksScreen;