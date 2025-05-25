import { SessionContext } from '@/contexts/SessionContext';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Divider, Surface } from 'react-native-paper';
import { ThemeContext } from '@react-navigation/native';

export default function ActivityProfileBox({ user }: {user: User}) {

    // const user = useContext(SessionContext);
    // const workoutCount = user.workouts?.length;
    const workoutCount = 2 | 1;
    const friendCount = user.friendsCount;
    const theme = useContext(ThemeContext);
    
    return (
        <Surface style={[styles.container, { backgroundColor: theme?.colors.card }]}>
            <View style={styles.subBox}>
                <ThemedText style={styles.num}>{workoutCount}</ThemedText>
                <ThemedText style={styles.subText}>Workout{workoutCount === 1 ? "" : "s"}</ThemedText>
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