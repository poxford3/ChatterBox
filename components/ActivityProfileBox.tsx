import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Divider, Surface } from 'react-native-paper';
import { ThemeContext } from '@react-navigation/native';
import { UserContext } from '@/contexts/UserContext';
import { ApiService } from '@/hooks/ApiService';

export default function ActivityProfileBox({ api }: { api: ApiService }) {

    const userContext = useContext(UserContext);
    const jwt = userContext.jwt;
    const[sessionCount, setSessionCount] = useState(0);
    const[friendCount, setFriendCount] = useState(0);

    const getSessionCount = async () => {
        try {
            let sessions = await api.get<Session[]>(`/sessions?user_id=${userContext.user?.id}`, jwt);
            setSessionCount(sessions.length);
        } catch (err) {
            console.error("error getting session count", err);
        }
    }

    const getFriendCount = async () => {
        try {
            let friends = await api.get<Friends[]>(`/friends/${userContext.user?.id}`, jwt);
            setFriendCount(friends.length);
        } catch (err) {
            console.error("error getting friend count", err);
        }

    }

    const theme = useContext(ThemeContext);

    useEffect(() => {
        getSessionCount();
        getFriendCount();
    }, [])
    
    return (
        <Surface style={[styles.container, { backgroundColor: theme?.colors.card }]}>
            <View style={styles.subBox}>
                <ThemedText style={styles.num}>{sessionCount}</ThemedText>
                <ThemedText style={styles.subText}>Workout{sessionCount === 1 ? "" : "s"}</ThemedText>
            </View>
            <Divider style={{ width: StyleSheet.hairlineWidth, height: '75%'}} />
            <View style={styles.subBox}>
                <ThemedText style={styles.num}>{friendCount}</ThemedText>
                <ThemedText style={styles.subText}>Friend{friendCount === 1 ? "" : "s"}</ThemedText>
            </View>
        </Surface>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        elevation: 4,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    num: {
        fontWeight: 'bold'
    },
    subText: {
        fontWeight: 300,
    },
    subBox: {
        margin: 5,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});