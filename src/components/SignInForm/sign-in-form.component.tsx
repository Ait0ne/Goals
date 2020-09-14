import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {View, Text, TextInput, TouchableOpacity, Animated, Alert} from 'react-native';

import {useAuth} from '../AuthProvider/auth-provider.component';
import {styles} from './sign-in-form.styles';

interface SignInFormProps {
    translateX: Animated.Value
}



const SignInForm:React.FC<SignInFormProps> = ({translateX}) => {
    const {login} = useAuth()



    const validationSchema = yup.object().shape({
        email: yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email'),
        password: yup.string()
        .label('Password')
        .required('Password is required')
    })

    const handleSubmit = async({email, password}: {email:string, password:string}) => {
        try {
            await login(email, password)
        } catch {
            Alert.alert('Login Error', 'email or password were incorrect')
        }
    }
    return (
        <Formik
        initialValues={{email:'', password:''}}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
        >{({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <Animated.View style = {[styles.formContainer, {translateX:translateX}]}>
                <TextInput style={styles.input}
                placeholder='Email'
                onChangeText = {handleChange('email')} 
                onBlur={handleBlur('email')}
                value = {values.email} 
                />
                <Text style={{ color: 'red' }}>{errors.email}</Text>
                <TextInput style={styles.input} 
                placeholder='Пароль'
                onChangeText = {handleChange('password')} 
                onBlur={handleBlur('password')}
                value = {values.password} 
                secureTextEntry
                />
                <Text style={{ color: 'red' }}>{errors.password}</Text>
                <View style={{marginTop: 30}} >
                    <TouchableOpacity style={styles.button} 
                    onPress = {handleSubmit}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>)}
        </Formik>
    )
}

export default SignInForm;