import React, { useEffect, useState} from 'react';
import {View, Text, Image, FlatList, UIManager, Platform, Animated, LayoutAnimation, Dimensions} from 'react-native';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import {useTasks} from '../../components/TasksProvider/tasks-provider.component';
import {styles} from './daily-tasks.styles';
import {Task} from '../../schemas/task.schema';
import AddTaskFab from '../../components/AddTaskFab/add-task-fab.component';
import CircleIcon from '../../components/CircleIcon/circle-icon.component';
import Legend from '../../components/Legend/legend.component';


type RouteProps = {
    dailyTasksScreen: {date:number}
}






const DailyTasksScreen: React.FC = () => {
    const {params} = useRoute<RouteProp<RouteProps, 'dailyTasksScreen'>>()
    const {date} =  params
    const screenDate = new Date(date)
    const {tasks, setCurrentTask, setCurrentDate, closeTask, getTasksForTheDay} = useTasks()
    const [currentTasks, setCurrentTasks] = useState<Task[]>([])
    const navigation = useNavigation() 
    let animatedWidth: Animated.Value[] = []
    let listItemRefs = currentTasks.map(task=> {
        animatedWidth.push(new Animated.Value(0))
        return React.createRef<any>()
    }) 
    


    const handleTaskOpen = (task:Task) => {
        setCurrentDate(screenDate)
        setCurrentTask(task)
        navigation.navigate('addTaskModal')
    }

    const handleDelete =(task:Task, index:number) => {
        Animated.timing(animatedWidth[index], {
            toValue: Dimensions.get('window').width*0.85,
            useNativeDriver: false,
            duration: 500
        }).start(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
            listItemRefs[index]?.current.lightSpeedOut(400)
            .then(() => {
                listItemRefs.splice(index, 1)
                closeTask(task)
            })
        })
    }

    useEffect(()=> {
        
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
    }, [])






    useEffect(()=> {
        const newTasks = getTasksForTheDay(screenDate) 
        if (newTasks) {
            setCurrentTasks(getTasksForTheDay(screenDate))
        }
        return () => {
            console.log('unmount')
        }
    }, [tasks])

    const renderItem = ({item, index}: {item:Task, index:number}) => {

        return (
            <Animatable.View ref={listItemRefs[index]} animation='bounceInRight'  delay={index*100} style={styles.itemContainer}>
                <Animated.View style={[styles.crossOutLine, {width: animatedWidth[index]}]}>
                </Animated.View>
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{item.taskType==='reminder'? moment(item.notificationTime).format('HH:mm'): <CircleIcon height={20} type={item.taskType}/>}</Text>
                </View>
                <View style={styles.textContainer} >
                    <Text onPress={ () => handleTaskOpen(item)}  style={[styles.text, item.taskType==='main'? styles.orangeText:null]}>{item.name}</Text>
                    {
                        item.taskType==='reminder'?
                        <Image 
                        source={require('./clock.png')}
                        style={styles.clock}
                        />
                        :null
                    }
                </View>
                <View style={styles.checkIconContainer}>
                    <Icon
                    onPress={() => handleDelete(item, index)}
                    name='ios-checkmark-circle-outline'
                    size={25}
                    color='#958D8D'
                    />
                </View>
            </Animatable.View>
        )
    }


    return (
        <View style={styles.screenContainer}>
            <Image 
            source={require('./goals.png')}
            style={styles.logo}
            />
            <Text style={styles.header}>{moment(screenDate).isSame(Date.now(), 'day')? 'Today': moment(screenDate).format('DD/MM/YYYY')}</Text>
            <FlatList
            data={currentTasks}
            keyExtractor={(item)=>  item._id.toHexString()}
            renderItem={renderItem}
            extraData={currentTasks}
            style={styles.list}
            />
            {
                moment(screenDate).isSameOrAfter(moment(), 'day')?
                <View style={styles.fabContainer}>
                    <AddTaskFab date={screenDate} size={60}/>
                </View>
                :null
            }
            <Legend  type='day'/>
        </View>
    )
}


export default DailyTasksScreen;