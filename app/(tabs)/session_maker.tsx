import React, { useContext, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextField } from '@/components/TextField';
import { Button } from 'react-native-paper';
import { SessionContext } from '@/contexts/SessionContext';

export default function SessionMaker() {

    const seshState = useContext(SessionContext);

    const [sessionName, setSessionName] = useState<string>("");
    const [sessionType, setSessionType] = useState<string>("");
    const [sessionUsers, setSessionUsers] = useState<[User]>([{
            name: "fake user",
            password: "fake pass",
            email: "fake email"
        }]);

    const submitForm = () => {
        console.log('submit form')
        seshState.createSession({name: sessionName, users: sessionUsers})
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