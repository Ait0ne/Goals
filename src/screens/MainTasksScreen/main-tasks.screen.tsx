import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import Logo from '../../components/Logo/logo.component';
import AddTaskFab from '../../components/AddTaskFab/add-task-fab.component';
import {styles} from './main-tasks.styles';

const MainTasksScreen:React.FC = () => {
    const navigation = useNavigation()


    useEffect(()=> {
        const listener = (e:any) => {
            e.preventDefault();
            BackHandler.exitApp()
        }
        navigation.addListener('beforeRemove', listener)
        return () => {
            navigation.removeListener('beforeRemove', listener )
        }
    }, [navigation])


    const handleRoute = (route:string) => {
        console.log(route)
        navigation.navigate(route, {date: Date.now()})
    }

    

    return (
        <View style={styles.screenContainer}>
            <Logo/>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleRoute('dailyTasksScreen')}>
                    <Text style={styles.buttonText}>DAY</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.button}  onPress={() => handleRoute('monthTasksScreen')}>
                    <Text style={styles.buttonText}>MONTH</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                 <TouchableOpacity style={styles.button}   onPress={() => handleRoute('weeklyTasksScreen')}>
                    <Text style={styles.buttonText}>WEEK</Text>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.button}  onPress={() => handleRoute('yearTasksScreen')}>
                    <Text style={styles.buttonText}>YEAR</Text>
                </TouchableOpacity>
            </View>
            <View style= {styles.FabContainer}>
                <AddTaskFab size={65} date={new Date()}/>
            </View>
        </View>
    )
}

export default MainTasksScreen;