import React, {useContext, useState, useEffect} from 'react';
import Realm from 'realm';
import SplashScreen from 'react-native-splash-screen'

import {navigate} from '../../../RootNavigation';
import {getRealmApp} from '../../realm/realm.config';

interface ContextProps {
    login: (email:string, password:string) => Promise<void>,
    logout: () => void,
    registerUser: (email:string, password:string) => Promise<void>,
    user: Realm.User<Realm.DefaultFunctionsFactory, any>|null
}

interface  AuthProviderProps {
    children: React.ReactNode
}

export const realmApp = getRealmApp();



const AuthContext = React.createContext<ContextProps|null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<Realm.User<Realm.DefaultFunctionsFactory, any>|null>(null);
    
    

    useEffect(()=> {
        if (realmApp.currentUser) {
            setUser(realmApp.currentUser)
        } else {
            SplashScreen.hide()
        }
    }, [setUser])

    useEffect(()=> {
        if(user) {
            SplashScreen.hide()
        }
    }, [user])


    const login = async(email:string, password:string) => {
        const credentials = Realm.Credentials.emailPassword(email, password)
        const newUser = await realmApp.logIn(credentials)
        console.log(realmApp.currentUser)
        console.log(newUser)
        setUser(newUser)
    }

    const logout = () => {
        if (!user) {
            return
        }
        user.logOut()
        setUser(null)
        navigate('auth')
    }

    const registerUser = async(email:string, password:string) => {
        await realmApp.emailPasswordAuth.registerUser(email, password)
    }


    return (
        <AuthContext.Provider
        value={{
            login,
            logout,
            registerUser,
            user
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const auth = useContext(AuthContext)
    if (!auth) {
        throw new Error('useAuth hook used outside AuthProvider')
    }
    return auth;
}

export {AuthProvider, useAuth}

