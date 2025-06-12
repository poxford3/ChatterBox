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
    const [sessionUsers, setSessionUsers] = useState<number[]>([0]);

    const submitForm = () => {
      console.log('submit form');
      // const userIdList = sessionUsers.map(u => u.id);
      if (!sessionName) return;
      if (!sessionType) return;
      setSessionUsers([user?.id as number, 2]);
      seshState.createSession({ 
          name: sessionName,
          type: sessionType,
          userIds: [user?.id as number, 2]
          // users: sessionUsers 
      })
      console.log("end of form");
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
        {sessionType === "weight" ? <ExerciseMaker /> : null}
          <Button 
              mode='contained'
              icon={"plus"}
              onPress={submitForm}
          >
              Create Session
          </Button>
      </ThemedView>
    )
}