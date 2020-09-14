import React, {useState, useEffect, useRef} from 'react';
import {View, TextInput, Text} from 'react-native';
import {ButtonGroup} from 'react-native-elements';

import {styles} from './task-main-options.styles';
import CircleIcon from '../CircleIcon/circle-icon.component';

interface TaskMainProps {
    taskName: string,
    setTaskType:  React.Dispatch<React.SetStateAction<"main" | "goal" | "reminder">>,
    setTaskName: React.Dispatch<React.SetStateAction<string>>,
    initialTaskType:string
}

const TaskMainOptions:React.FC<TaskMainProps> = ({taskName, setTaskName, setTaskType, initialTaskType}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<TextInput>(null)


    useEffect(() => {
        setSelectedIndex(initialTaskType==='main'? 0: initialTaskType==='goal'? 1 : 2)
    }, [initialTaskType])

    useEffect(()=> {
        setTimeout(() => {
            inputRef.current?.focus()
        }, 500);
    }, [inputRef])


    const firstOption = () => (
        <View style={styles.option}>
            <CircleIcon height={20} type='main'/>
            <Text style={[styles.buttonMainText, styles.buttonText]}>Главное</Text>
        </View>
    )
    const secondOption = () => (
        <View style={styles.option}>
            <CircleIcon height={20} type='goal'/>
            <Text style={styles.buttonText}>Цель</Text>
        </View>
    )

    const thirdOption = () => (
        <View style={styles.option}>
            <CircleIcon height={20} type='reminder'/>
            <Text style={styles.buttonText}>Напоминание</Text>
        </View>
    )


    const buttons = [{element: firstOption}, {element: secondOption}, {element: thirdOption}]

    const updateIndex = (index:number) => {
        if (index===0) {
            setSelectedIndex(0)
            setTaskType('main')
        } else if (index===1) {
            setSelectedIndex(1)
            setTaskType('goal')
        } else if (index===2) {
            setSelectedIndex(2)
            setTaskType('reminder')
        }
    }

    return(
        <View style={styles.container}>
            {console.log(selectedIndex)}
            <TextInput
            placeholder='Название заметки'
            onChangeText={text => setTaskName(text)}
            value={taskName}
            style={styles.input}
            ref={inputRef}
            />
            <ButtonGroup 
            buttons={buttons}
            selectedIndex={selectedIndex}
            onPress={updateIndex}
            buttonStyle={styles.button}
            containerStyle={styles.buttonsContainer}
            selectedButtonStyle={styles.selectedButton}
            innerBorderStyle={styles.buttonContainer}
            buttonContainerStyle={styles.bContainer}
            />
        </View>
    )
}

export default TaskMainOptions;