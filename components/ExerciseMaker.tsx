import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { ThemedText } from './ThemedText'
import React, { useEffect, useState } from 'react'
import { TextField } from './TextField';
import { Icon } from 'react-native-paper';
import uuid from 'react-native-uuid';
import ExerciseItem from './ExerciseItem';

type ExerciseMakerProps = {
  onExerciseChange: (exercises: Exercise[]) => void
}

export default function ExerciseMaker({ onExerciseChange }: ExerciseMakerProps) {

  const createBlankExercise = (): Exercise => {
    const blankExercise: Exercise = {
        id: uuid.v4(),
        // id: "blank",
        name: "",
        reps: 0,
        sets: 0,
        weight: 0
    }
    return blankExercise;
  }

  const [exercises, setExercises] = useState<Exercise[]>([createBlankExercise()]);

  const addExercise = () => {
    setExercises([...exercises, createBlankExercise()])
  }

  const updateExercise = (id: string, field: keyof Exercise, value: string) => {
    setExercises(prev =>
      prev.map(ex => {
        if (ex.id !== id) return ex;

        // Convert numeric fields from string to number
        if (['reps', 'sets', 'weight'].includes(field)) {
          return { ...ex, [field]: parseInt(value) || 0 };
        }

        return { ...ex, [field]: value };
      })
    );
  };

    // const updateExercise = (id: string, field: keyof Exercise, value: string) => {
    //   // console.log(`Updating ${field} for ${id} to: ${value}`);
    //   setExercises(prev =>
    //     prev.map(ex => {
    //       if (ex.id !== id) return ex;
    //       return { ...ex, [field]: value };
    //     })
    //   );
    // };

  const removeExercise = (exerciseToRemove: Exercise) => {
    setExercises(prevExercises => 
      prevExercises.filter(ex => ex.id !== exerciseToRemove.id)
    );
  }

  useEffect(() => {
    onExerciseChange(exercises);
  }, [exercises])


  return (
    <View style={styles.exerciseMakeView}>
      <View style={styles.headerText}>
        <ThemedText type='subtitle'>Add Exercises!</ThemedText>
        <TouchableOpacity
          onPress={addExercise}
        >
          <Icon source={"plus"} size={20} color='' />
        </TouchableOpacity>
      </View>
      {exercises.map(ex => 
        <ExerciseItem 
          key={ex.id}
          exercise={ex}
          updateExercise={updateExercise} 
          removeExercise={removeExercise} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  exerciseMakeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})