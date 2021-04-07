import React from 'react';
import {TextInput, View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Formik} from 'formik';
import * as yup from 'yup';
import { Task } from '../../schemas/task.schema';
import Icon from 'react-native-vector-icons/MaterialIcons'


import {useTasks} from '../TasksProvider/tasks-provider.component';
import {styles} from './search-form.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SearchFormProps {
    handleSearchResults: (tasks: Task[]) => void,

}


const SearchForm: React.FC<SearchFormProps> = ({handleSearchResults}) => {
    const {searchForTasks} = useTasks()


    const validationSchema = yup.object().shape({
        search: yup.string()
        .label('Search')
        .min(3, 'Please Enter at least 3 symbols')
    })


    const handleSubmit = ({search, includeClosedTasks}:{search: string, includeClosedTasks: boolean}) => {
        const results = searchForTasks(search, includeClosedTasks)
        handleSearchResults(results as Task[])
    }
    
    return (
        <Formik
        initialValues={{search:'', includeClosedTasks:false}}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, setFieldValue}) => (
            <View style={styles.container}>
                <View>
                    <TextInput 
                    placeholder='Search text'
                    onChangeText = {handleChange('search')} 
                    onBlur={handleBlur('search')}
                    value = {values.search} 
                    style={styles.input}
                    />
                    <Text style={{ color: 'red' }}>{errors.search}</Text>
                    <View style={styles.checkboxContainer}>
                        <CheckBox 
                        value={values.includeClosedTasks}
                        onValueChange={() => setFieldValue('includeClosedTasks', !values.includeClosedTasks)}
                        tintColors={{true: '#F07E44', false: '#F07E44'}}
                        />
                        <Text>Include finished tasks</Text>
                    </View>
                </View>
                <TouchableOpacity
                onPress={handleSubmit}
                style={styles.searchButton}
                >
                    <Icon  
                    name='search' 
                    size={30} 
                    color={'#ffffff'}
                    />
                </TouchableOpacity>
            </View>)}
        </Formik>
    )
} 


export default SearchForm;