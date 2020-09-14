import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native';

import {stylesWithProps} from './add-task-fab.styles';
import {useTasks} from '../../components/TasksProvider/tasks-provider.component';

interface FabProps {
    size:number,
    date: Date,
    task?: Object
}


const AddTaskFab:React.FC<FabProps> = ({size, date}) => {
    const styles= stylesWithProps(size)
    const navigation = useNavigation()
    const {setCurrentDate} = useTasks()


    const showModal = () => {
        setCurrentDate(date)
        navigation.navigate('addTaskModal')
    }


    return (
        <TouchableOpacity 
        style={styles.container}
        onPress={showModal}
        >
            <Icon name='plus' size={size/1.5} color={'#F07E44'}/>
        </TouchableOpacity>
    )
}

export default AddTaskFab;