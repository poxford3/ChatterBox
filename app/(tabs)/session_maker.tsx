import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextField } from '@/components/TextField';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function SessionMaker() {

    const [sessionName, setSessionName] = useState<string>("");
    const [sessionType, setSessionType] = useState<string>("");
    const [sessionUsers, setSessionUsers] = useState<[User]>();

    const submitForm = () => {
        router.navigate({
            pathname: "/",
            params: {
                sessionName: sessionName,
            }
        })
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
                placeholder='session type'
                onChangeText={setSessionName}
            />
            <ThemedText>{sessionName} + hi</ThemedText>
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