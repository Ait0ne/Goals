import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, Text, KeyboardAvoidingView, Animated, Easing} from 'react-native'
import Logo from '../components/Logo/logo.component';
import {useNavigation} from '@react-navigation/native';

import {styles} from './auth.styles';
import SignInForm from '../components/SignInForm/sign-in-form.component';
import SignUpForm from '../components/SignUpForm/sign-up-form.component';
import {useAuth} from '../components/AuthProvider/auth-provider.component';



const AuthScreen: React.FC = () => {
    const [signInShown, setSignInShown] = useState(true)
    const {user} = useAuth()
    const navigation = useNavigation()


    useEffect(()=> {
        if (user) {
            navigation.navigate('mainTasksScreen')
        }
    }, [user])

    const translateXsignIn = useRef(new Animated.Value(signInShown? 0: -800)).current
    const translateXsignUp = useRef(new Animated.Value(signInShown? 800: 0)).current


    const toggleSignInSignUp = () => {
        Animated.parallel([
            Animated.timing(translateXsignIn, {
                toValue: signInShown? -800: 0,
                duration: 600,
                easing: Easing.ease,
                useNativeDriver: true
            }),
            Animated.timing(translateXsignUp, {
                toValue: signInShown? 0: 800,
                duration: 600,
                easing: Easing.ease,
                useNativeDriver: true
            })
        ]).start()

        setSignInShown(!signInShown)
    }

    

    return (
        <KeyboardAvoidingView style={styles.container}>
                <Logo />
                <View style={styles.formsContainer}>
                    <SignInForm translateX={translateXsignIn}/>
                    <SignUpForm translateX={translateXsignUp}/>
                </View>
                <View style={styles.noAccount}>
                    <Text>Нет акккаунта?</Text>
                    <TouchableOpacity style={styles.registration} onPress={toggleSignInSignUp}>
                        <Text style={styles.registrationText}>Регистрация</Text>
                    </TouchableOpacity> 
                </View>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen;

