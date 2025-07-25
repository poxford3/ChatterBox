import React, { useContext, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TextField } from '@/components/TextField';
import { Button, ToggleButton } from 'react-native-paper';
import { SessionContext } from '@/contexts/SessionContext';
import { View } from 'react-native';
import { UserContext } from '@/contexts/UserContext';
import ExerciseMaker from '@/components/ExerciseMaker';

export default function SessionMaker() {

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
    <ParallaxScrollView
        // headerBackgroundColor={{ light: '#6FC276', dark: '#4CA054' }}
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
        <IconSymbol
            size={310}
            color="#808080"
            // color="#163418"
            name="chart.bar.xaxis"
        //   style={styles.headerImage}
        />
        }>
        <ThemedView>
            <ThemedText type='title'>Trends</ThemedText>
        </ThemedView>
    </ParallaxScrollView>
  )
}