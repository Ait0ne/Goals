import React, {useState, useReducer, useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import { styles } from './add-task-modal.styles'
import TaskMainOptions from '../../components/TaskMainOptions/task-main-options.component';
import NotificationOptions from '../../components/NotificationOptions/notification-options.component';
import {useTasks} from '../../components/TasksProvider/tasks-provider.component';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native-animatable';



export type NotificationAction = {type: 'SET_DATE', payload: Date}|{type: 'SET_TIME', payload: Date}|{type: 'SET_REPEAT_TYPE', payload: 'single'|'year'|'month'|'day'|'week'}

export interface INotification {
    date:Date,
    time: Date,
    repeatType: 'single'|'year'|'month'|'day'|'week'
}


export const initialNotificationState:INotification = {
    date: new Date(),
    time: new Date(),
    repeatType: 'single'
}


const notificationReducer = (state: INotification, action:NotificationAction) => {
    switch (action.type) {
        case 'SET_DATE': 
            return {
                ...state, 
                date: action.payload
            }
        case 'SET_TIME': 
            return {
                ...state, 
                time : action.payload 
            }
        case 'SET_REPEAT_TYPE': 
            return {
                ...state, 
                repeatType: action.payload
            }
        default: 
            return state
    }
}   

let datepicker:Element|null=null

const AddTaskModal:React.FC = () => {
    const [taskName, setTaskName] = useState('')
    const [taskType, setTaskType] = useState<'main'|'goal'|'reminder'>('main')
    const [date, setDate] = useState(new Date())
    const [initialTaskType, setInitialTaskType] = useState('main')
    const [showChooseDate, setShowChooseDate] = useState(false)
    const [notification, dispatch] = useReducer(notificationReducer, initialNotificationState)
    const scaleY = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()
    const {createTask, deleteAll, currentDate, currentTask, setCurrentDate, setCurrentTask, updateTask} = useTasks()

    useEffect(() => {
        if (currentTask) {
            setInitialTaskType(currentTask.taskType)
            setTaskType(currentTask.taskType)
            setTaskName(currentTask.name)
            setDate(currentTask.notificationDate)
            dispatch({type: 'SET_DATE', payload: currentTask.notificationDate})
            dispatch({type: 'SET_TIME', payload: currentTask.notificationTime})
            dispatch({type: 'SET_REPEAT_TYPE', payload: currentTask.notificationRepeatType})
        } else  if (currentDate) {
            setDate(currentDate)
            dispatch({type: 'SET_DATE', payload: currentDate})
        }
        return () => {
            if (currentDate||currentTask) {
                setCurrentDate(undefined)
                setCurrentTask(undefined)
            }
        }
    }, [currentDate, currentTask])

    useEffect(()=> {
        Animated.timing(scaleY, {
            toValue:taskType==='reminder'? 1: 0,
            useNativeDriver: true,
            duration: 500
        }).start()
    }, [taskType])

    const handleSubmit = () => {
        if (taskName.length>0) {
            const taskInfo = {
                date: date,
                name: taskName,
                notification: notification,
                taskType: taskType
            }
            if (currentTask) {
                updateTask(taskInfo)
            } else {
                createTask(taskInfo)
            }
            
        } 
        setCurrentDate(undefined)
        setCurrentTask(undefined)
        navigation.goBack()
    }

    const handleClose = () => {
        navigation.goBack()
    }

    const showDatePicker = () => {
        datepicker=(
            <DateTimePicker 
            value={date}
            mode='date'
            minimumDate={new Date()}
            maximumDate={moment().add(2,'year').toDate()}
            onChange={handleDateChange}
            />
        )
        console.log(datepicker)
        setShowChooseDate(true)
    }
    const handleDateChange = (event: Event, date?:Date) => {
        console.log(event)
        if (date) {
            dispatch({type: 'SET_DATE', payload: date})
            setDate(date)
        }
        setShowChooseDate(false)
        datepicker=null
    }

    console.log(datepicker)

    return (
        <View style={styles.screenContainer}>
            <View style={styles.navigation}>
                <Icon onPress={handleClose} name='close' size={35} color='#F07E44'/>
                <Icon onPress={handleSubmit} name='check' size={35} color='#F07E44'/> 
            </View>
            <Text onPress={taskType==='reminder'? undefined : showDatePicker} style={[styles.header, taskType==='reminder'? styles.disabled : null]}>{moment(date).format('DD/MM/YYYY')}</Text>
            <TaskMainOptions  taskName={taskName} setTaskName={setTaskName} setTaskType={setTaskType} initialTaskType={initialTaskType}/>
            <Animated.View
            style={{scaleY:scaleY, scaleX: scaleY }}
            >
                <NotificationOptions dispatch={dispatch} taskName={taskName} notification={notification} />
            </Animated.View>
            {
                showChooseDate&&datepicker? datepicker: null
            }
        </View>
    )
}

export default AddTaskModal;
