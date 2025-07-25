import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { SessionContext } from '@/contexts/SessionContext';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { TextField } from './TextField';
import { Button, ToggleButton } from 'react-native-paper';
import ExerciseMaker from './ExerciseMaker';

export default function NoSession() {

    const seshState = useContext(SessionContext);
    const userContext = useContext(UserContext);
    const user = userContext.user;
    const [sessionName, setSessionName] = useState<string>("");
    const [sessionType, setSessionType] = useState<SessionType>(null);
    const [sessionUsers, setSessionUsers] = useState<number[]>([user?.id ?? 0]);
    const [exercises, setExercises] = useState<Exercise[]>();

    const handleExerciseChanges = (exercises: Exercise[]) => {
        setExercises(exercises);
    }

    const removeKey = (arr: Exercise[]) => {
        return arr.map(({ ['id']: _, ...rest}) => rest);
    };

    const submitForm = () => {
      console.log('submit form');
      // const userIdList = sessionUsers.map(u => u.id);
      if (!sessionName) return;
      if (!sessionType) return;
      setSessionUsers([user?.id as number, 2]);
      if (
            exercises?.length === 1 && 
            exercises[0].name === "" || 
            sessionType !== "weight"
        ) {
            seshState.createSession({ 
                name: sessionName,
                type: sessionType,
                userIds: [user?.id as number, 2],
        });
      } else {
            let exerciseData = removeKey(exercises!);
            seshState.createSession({ 
                name: sessionName,
                type: sessionType,
                userIds: [user?.id as number, 2],
                exercises: exerciseData
        });
      }
      console.log("end of form");
    }

    function printSession(): void {
        console.log({ 
          name: sessionName,
          type: sessionType,
          userIds: [user?.id as number, 2],
          exercises: exercises
          // users: sessionUsers 
      })
    }

    return (
      <ThemedView>
        <ThemedText>
          No active session
        </ThemedText>
        <TextField
          value={sessionName}
          placeholder='Session Name'
          onChangeText={setSessionName}
          style={{ margin: 5 }}
        />
        <View style={{justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row'}}>
          <ThemedText>Select session type: </ThemedText>
          <ToggleButton.Row
              value={sessionType ?? ''}
              onValueChange={(val) => {
                  setSessionType(val as SessionType);
              }}
          >
              <ToggleButton icon="bike" value='bike' />
              <ToggleButton icon="run" value='run' />
              <ToggleButton icon="dumbbell" value='weight' />
          </ToggleButton.Row>
        </View>
        {sessionType === "weight" ? <ExerciseMaker onExerciseChange={handleExerciseChanges} /> : null}
          <Button 
              mode='contained'
              icon={"plus"}
              onPress={submitForm}
          >
              Create Session
          </Button>
        <Button 
              mode='contained'
              icon={"plus"}
              onPress={printSession}
              style={{marginTop: 5}}
          >
              test session data
          </Button>
      </ThemedView>
    )
}