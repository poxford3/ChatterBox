import React, { useContext, useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { SessionContext } from '@/contexts/SessionContext';
import { Button } from 'react-native-paper';
import Stopwatch from './Stopwatch';

export default function SessionView() {

  const seshState = useContext(SessionContext);

  const [duration, setDuration] = useState(0);

  const handleStopwatchTime = (dur: number) => {
    setDuration(dur);
  }

  const session = seshState.session;
  if (!session) return;
  const username = session?.users[0].name

  const endSession = () => {
    seshState.finishSession({ duration: duration })
  }

  return (
    <ThemedView>
      <ThemedText>welcome {username} to the session: {session?.name}</ThemedText>
      <Stopwatch sendTime={handleStopwatchTime} />
      <ThemedText>{duration}</ThemedText>
      <Button mode='contained' style={{width: 150}} onPress={endSession}>
        End session!
      </Button>
    </ThemedView>
  )
}