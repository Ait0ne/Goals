import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import AuthScreen from './src/screens/auth.screen';
import MainTasksScreen from './src/screens/MainTasksScreen/main-tasks.screen';
import AddTaskModal from './src/screens/addTaskModal/add-task-modal';
import DailyTasksScreen from './src/screens/DailyTasks/daily-tasks.screen';
import WeeklyTasksScreen from './src/screens/WeeklyTasks/weekly-tasks.screen';
import MonthTasksScreen from './src/screens/MonthTasks/month-tasks.screen';
import YearTasksScreen from './src/screens/YearTasksScreen/year-tasks.screen';
import SearchModal from './src/screens/SearchModal/search-modal';


import {AuthProvider} from './src/components/AuthProvider/auth-provider.component';
import {navigationRef, isMountedRef} from './RootNavigation';
import { TasksProvider } from './src/components/TasksProvider/tasks-provider.component';



const Stack = createStackNavigator()
const MainStack = createStackNavigator()






const App:React.FC = () => {

  useEffect(()=> {
    return () => {
      (isMountedRef as React.MutableRefObject<boolean>).current=false
    
    }

  }, [])
  
  const MainStackScreen = () => {
    return (
      <MainStack.Navigator  initialRouteName='auth' mode='card'>
            <MainStack.Screen  name='auth' component={AuthScreen} options={{headerShown:false}}/>
            <MainStack.Screen name='mainTasksScreen'  component={MainTasksScreen} options={{headerShown:false}}/>
            <MainStack.Screen name='dailyTasksScreen' component={DailyTasksScreen} options={{headerShown:false}}/>
            <MainStack.Screen name='weeklyTasksScreen' component={WeeklyTasksScreen} options={{headerShown:false}}/>
            <MainStack.Screen name='monthTasksScreen' component={MonthTasksScreen} options={{headerShown:false}}/>
            <MainStack.Screen name='yearTasksScreen' component={YearTasksScreen} options={{headerShown:false}}/>
      </MainStack.Navigator>
    )
  }

  return (
    <AuthProvider>
      <TasksProvider>
        <NavigationContainer  ref={navigationRef} onReady={() => {
            (isMountedRef as React.MutableRefObject<boolean>).current=true
          }}>
          <Stack.Navigator  initialRouteName='main' mode='modal'>
              <Stack.Screen name='main' component={MainStackScreen} options={{headerShown:false}}/>
              <Stack.Screen name='addTaskModal' component={AddTaskModal} options={{headerShown:false}}/>
              <Stack.Screen name='searchModal' component={SearchModal} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
    </AuthProvider>
  );
};



export default App;
