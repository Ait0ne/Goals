import React, {useState} from 'react';
import {View, Text, Animated, Image, Dimensions, LayoutAnimation, FlatList} from 'react-native';

import ModalNavigation from '../../components/ModalNavigation/modal-navigation.component';
import SearchForm from '../../components/SearchForm/search-form.component';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import CircleIcon from '../../components/CircleIcon/circle-icon.component';
import {useTasks} from '../../components/TasksProvider/tasks-provider.component';
import { Task } from '../../schemas/task.schema';
import {useNavigation} from '@react-navigation/native';


import {styles} from './search-modal.styles';

const SearchModal: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]) 
    const {setCurrentDate, setCurrentTask, closeTask} = useTasks()
    const navigation = useNavigation()
    let animatedWidth: Animated.Value[] = []
    let listItemRefs = tasks.map(task=> {
        animatedWidth.push(new Animated.Value(0))
        return React.createRef<any>()
    }) 

    const handleTaskOpen = (task:Task) => {
        setCurrentDate(task.date)
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
                console.log(task._id, tasks)
                const newTasks = tasks.filter((t) => t._id.toHexString()!==task._id.toHexString())
                setTasks(newTasks)
                closeTask(task)
            })
        })
    }

    const renderItem = ({item, index}: {item:Task, index:number}) => {

        return (
            <Animatable.View 
            ref={listItemRefs[index]} 
            animation='bounceInRight'  
            delay={index*100} 
            style={[styles.itemContainer]}>
                
                <Animated.View style={[styles.crossOutLine, {width: animatedWidth[index]}]}>
                </Animated.View>
                <View style={styles.timeContainer}>
                    <Text 
                    style={styles.time}
                    lineBreakMode='head'
                    >
                        {item.taskType==='reminder'? moment(item.notificationTime).format('HH:mm'): <CircleIcon height={20} type={item.taskType}/>}
                    </Text>
                </View>
                <View style={styles.textContainer} >
                    <Text 
                    onPress={ () => handleTaskOpen(item)}  
                    style={[
                        styles.text, 
                        item.taskType==='main'&&item.taskStatus!=='finished'? styles.orangeText:null,
                        item.taskStatus==='finished'? styles.finished:null
                    ]}
                    >
                        {item.name}
                    </Text>
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
                    {
                        item.taskStatus==='active' ?
                        <Icon
                        onPress={() => handleDelete(item, index)}
                        name='ios-checkmark-circle-outline'
                        size={25}
                        color='#958D8D'
                        />
                        : null
                    }
                </View>
            </Animatable.View>
        )
    }

    return(
        <View style={styles.searchModalContainer}>
            <ModalNavigation closeIcon/>
            <SearchForm handleSearchResults={setTasks}/>
            <FlatList
            data={tasks}
            keyExtractor={(item)=>  item._id.toHexString()}
            renderItem={renderItem}
            extraData={tasks}
            style={styles.list}
            />
        </View>
    )
}

export default SearchModal;