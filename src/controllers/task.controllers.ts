import Realm, {Configuration} from 'realm';
import PushNotification from 'react-native-push-notification';
import {ObjectID} from 'bson';
import moment from 'moment';

import {TaskInfo} from '../components/TasksProvider/tasks-provider.component';
import {Task} from '../schemas/task.schema';
import {realmApp} from '../components/AuthProvider/auth-provider.component';
import {navigate} from '../../RootNavigation';

const dailyNotificationTime = {
    hour: 0,
    min: 1,
    sec: 0
}




PushNotification.configure({
    onNotification:(notification:any)=> {
        // PushNotification.cancelAllLocalNotifications()
        PushNotification.getScheduledLocalNotifications((notifications) => {
            notifications.forEach(n => {
                console.log(n)
            })
        })
        console.log(notification.id)
        navigate('dailyTasksScreen', {date: new Date().getTime()})
        if (notification.action==='Выполнено'&&realmApp.currentUser) {
            navigate('dailyTasksScreen', {date: new Date().getTime()})
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
        if (notification.action==='Выполнено') {
          console.log(notification)
        }   
    },
    requestPermissions: false,
    
  })


  PushNotification.createChannel(
    {
      channelId: "goals", // (required)
      channelName: "Goals", // (required)
      channelDescription: "Goals app notifications", // (optional) default: undefined. // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  

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
            let timeoutTime: number;
            if (currentDate.getFullYear()===date.getFullYear()&&currentDate.getMonth()===date.getMonth()&&currentDate.getDate()===date.getDate()) {
                scheduledDate=new Date(Date.now() + 10*1000)
                timeoutTime = moment(scheduledDate)
                .add(1, 'day')
                .set('hour', dailyNotificationTime.hour)
                .set('minute', dailyNotificationTime.min)
                .set('second', dailyNotificationTime.sec)
                .toDate().getTime() - scheduledDate.getTime()
                console.log(timeoutTime)
            } else {
                date.setHours(
                    dailyNotificationTime.hour,
                    dailyNotificationTime.min,
                    dailyNotificationTime.sec
                )
                scheduledDate=date
                timeoutTime = 24*59*1000
            }
            PushNotification.localNotificationSchedule({
                title: taskType==='main'? 'Главное' : 'Цель',
                channelId: 'goals',
                autoCancel: false,
                ongoing: taskType==='main'? true:false,
                message: name,
                tag: 'task',
                actions: ['Выполнено'],
                date: scheduledDate,
                id: notificationId,
                color: taskType==='main'? '#F07E44' : '#ffffff',
                vibrate: false,
                timeoutAfter: timeoutTime,
                allowWhileIdle: true,
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
            const timeoutTime = moment(notification.time).endOf('day').toDate().getTime() - notification.time.getTime()
            scheduledDate.setFullYear(notification.date.getFullYear(), notification.date.getMonth(), notification.date.getDate())
            
            PushNotification.localNotificationSchedule({
                title: 'Напоминание',
                channelId: 'goals',
                autoCancel: false,
                ongoing: false,
                message: name,
                tag: 'reminder',
                date: scheduledDate,
                id: notificationId,
                vibrate: true,
                playSound: true,
                repeatType: notification.repeatType==='single'? undefined : notification.repeatType!=='year'? notification.repeatType : 'time',
                repeatTime: notification.repeatType==='year'? 31556952000 : undefined,
                timeoutAfter: timeoutTime,
                allowWhileIdle: true
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