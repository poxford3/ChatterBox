import React, { useContext } from 'react'
import { Alert, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SessionContext } from '@/contexts/SessionContext';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function Sessions() {

    const seshState = useContext(SessionContext);
    const sessions = seshState.allSessions;

    const borderColor = useThemeColor({}, 'text');

    type seshListProps = {
        sesh: Session
    }

    const twoButtonAlert = ({ id }: { id: string }) => {
        Alert.alert('Deletion Warning', 'Are you sure you want to delete?', [
            {
                text: "Yes",
                onPress: () => seshState.deleteSession({ sesh_id: id }),
            },
            {
                text: "No",
                style: 'cancel',
            }
        ])
    }

    const SessionListItem = ({ sesh }: seshListProps) => (
        <ThemedView style={{ borderColor: borderColor, borderWidth: 1, borderRadius: 10, padding: 10, marginVertical: 5}}>
            <Pressable onPress={() => twoButtonAlert({ id: sesh.id })}>
                <ThemedText>name: {sesh.name}</ThemedText>
                {/* <ThemedText>id: {sesh.id}</ThemedText> */}
                <ThemedText>duration: {sesh.duration} milliseconds</ThemedText>
                <ThemedText>active?: {sesh.active.toString()}</ThemedText>
                <ThemedText>startDate: {sesh.date.toString()}</ThemedText>
                <ThemedText>user: {sesh.users[0].name}</ThemedText>
            </Pressable>
        </ThemedView>
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
            <IconSymbol
                size={310}
                color="#808080"
                name="list.bullet.below.rectangle"
            //   style={styles.headerImage}
            />
            }>
            <ThemedView>
                <ThemedText type='title'>All sessions</ThemedText>
                {sessions ? 
                    (sessions.map(sesh => (
                        <SessionListItem sesh={sesh} key={sesh.id} />
                    )))
                : null}
            </ThemedView>
        </ParallaxScrollView>
    )
}