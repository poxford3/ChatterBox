import React, { useContext, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextField } from '@/components/TextField';
import { Button, ToggleButton } from 'react-native-paper';
import { SessionContext } from '@/contexts/SessionContext';
import { View } from 'react-native';

export default function SessionMaker() {

    const seshState = useContext(SessionContext);

    const [sessionName, setSessionName] = useState<string>("");
    const [sessionType, setSessionType] = useState<SessionType>(null);
    const [sessionUsers, setSessionUsers] = useState<User[]>([{
            id: "testid",
            name: "fake user",
            password: "fake pass",
            email: "fake email"
        }]);

    const submitForm = () => {
        console.log('submit form');
        const userIdList = sessionUsers.map(u => u.id);
        if (!sessionName) return;
        if (!sessionType) return;
        seshState.createSession({ 
            name: sessionName,
            type: sessionType,
            users: userIdList 
        })
    }

    return (
    <ParallaxScrollView
        // headerBackgroundColor={{ light: '#6FC276', dark: '#4CA054' }}
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
        <IconSymbol
            size={310}
            color="#808080"
            // color="#163418"
            name="plus.app"
        //   style={styles.headerImage}
        />
        }>
        <ThemedView>
            <ThemedText type='title'>New Session</ThemedText>
            <TextField 
                value={sessionName}
                placeholder='Session Name'
                onChangeText={setSessionName}
                style={{margin: 5}}
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
            <Button 
                mode='contained'
                icon={"plus"}
                onPress={submitForm}
            >
                Create Session
            </Button>
        </ThemedView>
    </ParallaxScrollView>
  )
}