import Realm, {Configuration, Results, UpdateMode} from 'realm';
import PushNotification from 'react-native-push-notification';
import {ObjectID} from 'bson';

import {TaskInfo} from '../components/TasksProvider/tasks-provider.component';
import {Task} from '../schemas/task.schema';
import {realmApp} from '../components/AuthProvider/auth-provider.component';
import {navigate} from '../../RootNavigation';

PushNotification.configure({
    onNotification:(notification:any)=> {
        // PushNotification.cancelAllLocalNotifications()
        PushNotification.getScheduledLocalNotifications((notifications) => {
            notifications.forEach(n => {
                console.log(n)
            })
        })
        navigate('dailyTasksScreen', {date: new Date().getTime()})
        if (notification.action==='Выполнено'&&realmApp.currentUser) {
            const config:Configuration = {
                schema: [Task.taskSchema],
                sync: {
                    user:realmApp.currentUser,
                    partitionValue: realmApp.currentUser.id,
                }
            }
            Realm.open(config)
            .then(openedRealm => {
                const tasks:any= openedRealm.objects('Task').filtered(`notificationId == ${notification.id}`)
                console.log(tasks)
                try {
                    if (tasks[0]) {
                        openedRealm.write(() => {
                            (tasks[0] as Task).taskStatus='finished'
                            console.log(tasks)
                        })
                    }
                } catch {

                }
                PushNotification.clearLocalNotification('task', parseInt(notification.id))
                openedRealm.close()
            })
        }
        
    },
    onAction: (notification:any) =>  {
        console.log(1)
        if (notification.action==='Выполнено') {
          console.log(notification)
        }   
    },
    requestPermissions: false
  })
  

  export const createNewTask = ({date,name,notification,realm,taskType, userId, taskId}: TaskInfo&{realm:Realm|null, userId: string, taskId?:ObjectID}) => {
    realm?.write(() => {
        console.log('write')
        if (taskType!=='reminder') {
            const notificationId = new Date().getTime()%10**9
            realm.create(
                'Task',
                new Task({
                    date,
                    name,
                    notificationRepeatType: 'single',
                    notificationDate: date,
                    notificationTime: date,
                    owner_id: userId,
                    taskType: taskType,
                    notificationId: notificationId,
                    id: taskId,

                }),taskId?true:false
            )
            const currentDate = new Date()
            let scheduledDate:Date;
            if (currentDate.getFullYear()===date.getFullYear()&&currentDate.getMonth()===date.getMonth()&&currentDate.getDate()===date.getDate()) {
                scheduledDate=new Date(Date.now() + 10*1000)
            } else {
                date.setHours(0,1,0)
                scheduledDate=date
            }
            PushNotification.localNotificationSchedule({
                title: taskType==='main'? 'Главное' : 'Цель',
                autoCancel: false,
                ongoing: taskType==='main'? true:false,
                message: name,
                tag: 'task',
                actions: "['Выполнено']",
                date: scheduledDate,
                id: notificationId,
                color: taskType==='main'? '#F07E44' : '#ffffff',
                vibrate: false
            })
        } else {
            const notificationId = new Date().getTime()%10**9
            realm.create(
                'Task',
                new Task({
                    date: notification.date,
                    name,
                    notificationRepeatType: notification.repeatType,
                    notificationDate: notification.date,
                    notificationTime: notification.time,
                    owner_id: userId,
                    taskType: taskType,
                    notificationId: notificationId,
                    id: taskId,
                }), taskId?true:false
            )
            const scheduledDate = notification.time
            scheduledDate.setFullYear(notification.date.getFullYear(), notification.date.getMonth(), notification.date.getDate())

            PushNotification.localNotificationSchedule({
                title: 'Напоминание',
                autoCancel: false,
                ongoing: false,
                message: name,
                tag: 'reminder',
                date: scheduledDate,
                id: notificationId,
                vibrate: true,
                playSound: true,
                repeatType: notification.repeatType==='single'? undefined : notification.repeatType!=='year'? notification.repeatType : 'time',
                repeatTime: notification.repeatType==='year'? 31556952000 : undefined
            })
        }
    })
  }

  export const updateTaskInfo = async({date,name,notification,realm,taskType, userId, taskToUpdate}: TaskInfo&{realm:Realm|null, userId: string, taskToUpdate:Task}) => {
        if (taskToUpdate) {
            PushNotification.clearLocalNotification(taskToUpdate.taskType==='reminder'? 'reminder': 'task', taskToUpdate.notificationId)
            createNewTask({date,name,notification,realm,taskType, userId, taskId:taskToUpdate._id})            
        }
        
        
            
  }