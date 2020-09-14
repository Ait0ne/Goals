import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Animated, Alert} from 'react-native';


import {useAuth} from '../AuthProvider/auth-provider.component';
import {styles} from './sign-up-form.styles';

interface SignUpFormProps {
    translateX: Animated.Value
}

const SignUpForm:React.FC<SignUpFormProps> = ({translateX}) => {
    const {registerUser, login} = useAuth()

    const validationSchema = yup.object().shape({
        email: yup.string()
        .email('Enter a valid email')
        .required('Please enter a registered email'),
        password: yup.string()
        .required('This is a required field')
        .min(6, 'Password must have at least 6 characters '),
        confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('This is a required field')
    })

    const handleSubmit = async({email, password}: {email:string, password:string}) => {
        try {
            await registerUser(email, password)
            await login(email, password)
            
        } catch (err)  {
            console.log(err)
            Alert.alert('Registration Error')
        }
    }

    return (

            <Formik
            initialValues={{email:'', password:'', confirmPassword: ''}}
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
                    <TextInput style={styles.input} 
                    placeholder='Подтвердите Пароль'
                    onChangeText = {handleChange('confirmPassword')} 
                    onBlur={handleBlur('confirmPassword')}
                    value = {values.confirmPassword} 
                    secureTextEntry
                    />
                    <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity style={styles.button} 
                        onPress = {handleSubmit}>
                            <Text style={styles.buttonText}>Регистрация</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>)}
            </Formik>

    )
}

export default SignUpForm;