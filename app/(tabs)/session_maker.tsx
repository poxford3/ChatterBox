import React, { useContext, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextField } from '@/components/TextField';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
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
        headerBackgroundColor={{ light: '#6FC276', dark: '#4CA054' }}
        headerImage={
        <IconSymbol
            size={310}
            color="#163418"
            name="gym.bag"
        //   style={styles.headerImage}
        />
        }>
        <ThemedView>
            <ThemedText type='title'>Create a session here</ThemedText>
            <TextField 
                value={sessionName}
                placeholder='session name'
                onChangeText={setSessionName}
                style={{margin: 5}}
            />
            <Button 
                mode='contained'
                icon={"camera"}
                onPress={submitForm}
            >
                hiiii
            </Button>
        </ThemedView>
    </ParallaxScrollView>
  )
}