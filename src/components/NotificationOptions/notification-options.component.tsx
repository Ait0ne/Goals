import React, {useState} from 'react';
import moment from 'moment';

import {styles} from './notification-options.styles';
import { View, Text } from 'react-native';
import {NotificationAction, initialNotificationState} from '../../screens/addTaskModal/add-task-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface NotificationOptionsProps {
    taskName: string,
    dispatch: React.Dispatch<NotificationAction>,
    notification: typeof initialNotificationState
     
}

const yearsFromNow = new Date()
yearsFromNow.setFullYear(yearsFromNow.getFullYear()+2)

let datepicker:Element|null=null

const NotificationOptions: React.FC<NotificationOptionsProps> = ({dispatch, taskName, notification}) => {
    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    const chooseRepeatType = (type:'single'|'year'|'month'|'day'|'week') => {
        dispatch({type: 'SET_REPEAT_TYPE', payload: type})
    }

    const handleDateChange = (event: Event, date?:Date) => {
        console.log(event)
        if (date) {
            dispatch({type: 'SET_DATE', payload: date})
        }
        setShowDateTimePicker(false)
        datepicker=null
    }
    const handleTimeChange = (event: Event, date?:Date|undefined) => {
        console.log(event)
        if (date) {
            dispatch({type: 'SET_TIME', payload: date})
        }
        setShowDateTimePicker(false)
        datepicker=null
    }


    const openDateTimePicker = (mode:string) => {
        if (mode==='date') {
            datepicker=(
                <DateTimePicker 
                value={notification.date}
                mode='date'
                minimumDate={new Date()}
                maximumDate={yearsFromNow}
                onChange={handleDateChange}
                />
            )
        } else if (mode==='time') {
            datepicker=(
                <DateTimePicker 
                value={notification.time}
                mode='time'
                onChange={handleTimeChange}
                is24Hour={true}
                />
            )
        }
        setShowDateTimePicker(true)
    }

    return (
        <View style={styles.container}>
            {
                showDateTimePicker&&datepicker
            }
            <Text style={styles.header}>Напомню тебе про:</Text>
            <Text style={styles.subheader}  numberOfLines={2}>{taskName}</Text>
            <View style={styles.rowContainer}>
                <Text style={[styles.text,styles.orangeText]}>Дата:</Text>
                <Text style={styles.date} onPress={() => openDateTimePicker('date')}>{moment(notification.date).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={[styles.text,styles.orangeText]}>Время:</Text>
                <Text style={styles.date} onPress={() => openDateTimePicker('time')}>{moment(notification.time).format('HH:mm')}</Text>
            </View>
            <View style={[styles.rowContainer, styles.alignFlexStart]}>
                <Text style={[styles.text,styles.orangeText]}>Периодичность:</Text>
                <View >
                    <TouchableOpacity 
                    onPress={() => chooseRepeatType('single')}
                    >
                        <Text style={[styles.text, notification.repeatType==='single'? styles.selectedOption:null]}>Один раз</Text>
                    </TouchableOpacity>
                    <View style={styles.dailyOptions}>
                        <Text style={styles.text}>Каждый</Text>
                        <TouchableOpacity 
                        onPress={() => chooseRepeatType('day')}
                    
                        >
                            <Text style={[styles.text,styles.orangeText, notification.repeatType==='day'? styles.selectedOption:null]}>день</Text>
                        </TouchableOpacity >
                        <TouchableOpacity 
                        onPress={() => chooseRepeatType('week')}
                        
                        >
                            <Text style={[styles.text,styles.orangeText, notification.repeatType==='week'? styles.selectedOption:null]}>нед.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => chooseRepeatType('month')}
                        
                        >
                            <Text style={[styles.text,styles.orangeText, notification.repeatType==='month'? styles.selectedOption:null]}>мес.</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity 
                    onPress={() => chooseRepeatType('year')}
                    
                    >
                        <Text style={[styles.text, notification.repeatType==='year'? styles.selectedOption:null]}>Ежегодно</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default NotificationOptions;