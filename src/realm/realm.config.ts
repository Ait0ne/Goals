import Realm from 'realm';


export const getRealmApp = () => {
    const appId = 'goals-chvlf'
    const appConfig = {
        id:appId,
        timeout: 10000,
        app: {
            name: 'goals',
            version: '1.0'
        }
    }
    
    return new Realm.App(appConfig);
}

