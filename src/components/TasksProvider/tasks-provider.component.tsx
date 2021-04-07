import React, {useState, useContext, useEffect, useRef} from 'react';
import Realm, {Configuration} from 'realm';
import PushNotification from 'react-native-push-notification';

import {useAuth} from '../AuthProvider/auth-provider.component';
import {Task} from '../../schemas/task.schema';
import {createNewTask, updateTaskInfo} from '../../controllers/task.controllers';
import {INotification} from '../../screens/addTaskModal/add-task-modal';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';


interface TasksProviderProps {
    children: React.ReactNode
}

export interface TaskInfo {
    date: Date,
    name: string,
    notification: INotification,
    taskType: 'main'|'goal'|'reminder'
}


interface ContextProps  {
    createTask: (taskInfo :TaskInfo) => void,
    updateTask: (taskInfo :TaskInfo) => void,
    deleteTask: (task :Task) => void,
    closeTask: (task :Task) => void,
    tasks: Object[]|undefined,
    deleteAll: () => void,
    currentTask: Task | undefined,
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | undefined>>,
    currentDate: Date|undefined,
    setCurrentDate: React.Dispatch<React.SetStateAction<Date|undefined>>,
    getTasksForTheDay: (date:Date) => Task[]
}


const TasksContext = React.createContext<ContextProps|null>(null);








const TasksProvider: React.FC<TasksProviderProps> = ({children}) => {
    const {user} = useAuth()
    const [tasks, setTasks] = useState<Object[]>()
    const [currentTask, setCurrentTask] = useState<Task|undefined>()
    const [currentDate, setCurrentDate] = useState<Date>()

    const realmRef = useRef<Realm>(null)


    useEffect(()=> {
        if (user === null) {
            console.log('user must be authenticated')
            return 
        }

        const config:Configuration = {
            schema: [Task.taskSchema],
            sync: {
                user,
                partitionValue: user.id,
                newRealmFileBehavior: {
                    type: "openImmediately",
                },
                existingRealmFileBehavior: {
                    type: "openImmediately"
                }
            },
        }

        let canceled = false
        
        Realm.open(config)
        .then((openedRealm) => {
            console.log(111)
            console.log(openedRealm)
            if (canceled) {
                openedRealm.close()
            };
            (realmRef as React.MutableRefObject<Realm>).current = openedRealm

            const syncTasks = openedRealm.objects('Task').filtered("taskStatus == 'active'")
            setTasks([...syncTasks])
            openedRealm.addListener('change', () => {
                setTasks([...syncTasks])
                console.log('change')
            })
        })
        .catch((err) => {
            console.log(222)
            console.log(err)
        })

        return () => {
            canceled = true
            const realm = realmRef.current
            if (realm!=null) {
                realm.removeAllListeners()
                realm.close();
                (realmRef as React.MutableRefObject<null>).current = null
            }
        }


    }, [user])

    const createTask = ({name, date, notification, taskType}:TaskInfo) => {
        const realm = realmRef.current
        RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled().then((isEnabled: boolean)=>{
            if(isEnabled){
                RNDisableBatteryOptimizationsAndroid.enableBackgroundServicesDialogue();
                // RNDisableBatteryOptimizationsAndroid.openBatteryModal();
            }
        });
        if (user) {
            createNewTask({name,date,notification,realm,taskType, userId: user.id})
        }
    }

    const updateTask = ({name, date, notification, taskType}:TaskInfo) => {
        const realm = realmRef.current
        if (user&&currentTask) {

            const taskToUpdate=currentTask
            setCurrentTask(undefined) 
            const newTasks = tasks?.filter((task:any)=> {
                console.log(task._id.toHexString()===taskToUpdate._id.toHexString())
                return task._id.toHexString()!==taskToUpdate._id.toHexString()
            })
            setTasks(newTasks)
            setTimeout(()=> {
                updateTaskInfo({name,date,notification,realm,taskType, userId: user.id, taskToUpdate})
            }, 100)
            
        }
    }

    const deleteTask = (task:Task)=> {
        const realm = realmRef.current
        realm?.write(()=> {
            realm.delete(task)
        })
    }

    const closeTask = (task:Task) => {
        const realm = realmRef.current
        PushNotification.clearLocalNotification(task.taskType==='reminder'? 'reminder': 'task', task.notificationId)
        realm?.write(()=> {
            task.taskStatus='finished'
        })
    }

    const deleteAll = () => {
        const realm = realmRef.current
        realm?.write(()=> {
            const tasks = realm.objects('Task')
            realm.delete(tasks)
        })
    }

    const getTasksForTheDay = (date: Date) => {
        const tasksForTheDay = tasks?.filter((task: any) => {
    
            if (task.notificationRepeatType==='single') {
                return task.date.getFullYear()===date.getFullYear()&&task.date.getMonth()===date.getMonth()&&date.getDate()===task.date.getDate()
            } else if (task.notificationRepeatType==='day') {
                return true
            } else if (task.notificationRepeatType==='week') {
                return date.getDay()===task.notificationDate.getDay()
            } else if (task.notificationRepeatType==='month') {
                return date.getDate()===task.notificationDate.getDate()
            } else if (task.notificationRepeatType==='year') {
                return date.getDate()===task.notificationDate.getDate()&&date.getMonth()===task.notificationDate.getMonth()
            } 
        })
        tasksForTheDay?.sort((a:any, b:any)=> {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        return tasksForTheDay as Task[]
    }
    



    return (
        <TasksContext.Provider
        value={{
            createTask,
            updateTask,
            deleteTask,
            tasks,
            deleteAll,
            currentDate,
            setCurrentDate,
            currentTask,
            setCurrentTask,
            closeTask,
            getTasksForTheDay
        }}
        >
            {children}
        </TasksContext.Provider>
    )
}

const useTasks = () => {
    const value = useContext(TasksContext)
    if (!value) {
        throw new Error('useTasks hook can only be used inside tasksProvider')
    }
    return value;
}

export {TasksProvider, useTasks}