import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { TextField } from './TextField';
import { Icon } from 'react-native-paper';

export default function ExerciseItem({
    exercise,
    updateExercise,
    removeExercise
  }: {
    exercise: Exercise;
    updateExercise: (id: string, field: keyof Exercise, value: string) => void;
    removeExercise: (exercise: Exercise) => void;
  }) {
    // console.log(exercise.id, exercise.name);
    // console.log(`Rendering ${exercise.id} with name: ${exercise.name}`);

    return (
      <View style={styles.row}>
        <TextField
          value={exercise.name ?? ""}
          onChangeText={(text) => updateExercise(exercise.id!, 'name', text)}
          style={styles.txt}
        />
        <TextField
          placeholder='reps'
          keyboardType='numeric'
          value={exercise.reps.toString()}
          onChangeText={(text) => updateExercise(exercise.id!, 'reps', text)}
          style={styles.txt}
        />
        <TextField
          placeholder='sets'
          keyboardType='numeric'
          value={exercise.sets.toString()}
          onChangeText={(text) => updateExercise(exercise.id!, 'sets', text)}
          style={styles.txt}
        />
        <TextField
          placeholder='weight'
          keyboardType='numeric'
          value={exercise.weight?.toString()}
          onChangeText={(text) => updateExercise(exercise.id!, 'weight', text)}
          style={styles.txt}
        />
        <TouchableOpacity onPress={() => removeExercise(exercise)}>
          <Icon source="trash-can" size={20} />
        </TouchableOpacity>
      </View>
    );
  };


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
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    txt: {
      marginHorizontal: 5,
    }
  })