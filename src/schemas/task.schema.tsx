import {ObjectID} from 'bson';



export interface ITask {
    name: string,
    date: Date,
    notificationDate:Date,
    notificationTime: Date,
    notificationRepeatType: 'single'|'year'|'month'|'day'|'week',
    taskType: "main" | "goal" | "reminder",
}




class Task   {
    public name:string
    public date: Date
    public _id: ObjectID
    public taskType: "main" | "goal" | "reminder"
    public notificationDate: Date
    public notificationTime: Date
    public notificationRepeatType: 'single'|'year'|'month'|'day'|'week'
    public owner_id:string
    public notificationId:number
    public taskStatus: 'active'|'finished'

    constructor({
        name, 
        date,
        id= new ObjectID(),
        notificationDate,
        notificationTime,
        notificationRepeatType,
        taskType,
        owner_id,
        notificationId,
        taskStatus='active'
    }:ITask&{id?:ObjectID, owner_id:string, notificationId: number, taskStatus?: 'active'|'finished'}) {
        this._id = id
        this.name = name
        this.date = date
        this.notificationDate= notificationDate,
        this.notificationTime= notificationTime,
        this.notificationRepeatType = notificationRepeatType,
        this.taskType=taskType,
        this.owner_id=owner_id
        this.notificationId = notificationId
        this.taskStatus = taskStatus
    }

    static taskSchema = {
        name: 'Task',
        properties: {
            _id: 'objectId',
            name: 'string',
            date: 'date',
            taskType: 'string',
            notificationDate: 'date',
            notificationTime: 'date',
            notificationRepeatType: 'string',
            notificationId: 'int',
            owner_id:'string',
            taskStatus: 'string'
        },
        primaryKey: '_id'
    }
}

export {Task}