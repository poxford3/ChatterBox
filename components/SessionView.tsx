import React, { useContext, useState } from 'react';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { SessionContext } from '@/contexts/SessionContext';
import { Button } from 'react-native-paper';
import Stopwatch from './Stopwatch';
import { ScrollView, StyleSheet, View } from 'react-native';
import TapToTalk from './TapToTalk';
import SpeakerPic from './SpeakerPic';

export default function SessionView() {

  const seshState = useContext(SessionContext);
  const session = seshState.session;
  // const created = session?.created!.getTime()!;
  // const now = new Date().getTime();
  // const timeSinceCreation = now - created;
  // console.log()

  const [duration, setDuration] = useState(0);

  const handleStopwatchTime = (dur: number) => {
    setDuration(dur);
  }

  if (!session) return;
  // const username = session?.users[0].name
  const username = "change me"

  const endSession = () => {
    seshState.finishSession({ duration: duration })
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText>welcome <ThemedText type='subtitle'>{username}</ThemedText> to the session:</ThemedText>
      <ThemedText style={{ textDecorationLine: 'underline'}} type='subtitle'>{session?.name}</ThemedText>
      <Stopwatch sendTime={handleStopwatchTime} />
      <TapToTalk />
      <ScrollView horizontal style={{flexDirection: 'row', padding: 10, borderWidth: 0}}>
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
        <SpeakerPic />
      </ScrollView>
      <Button mode='contained' style={{width: 150}} onPress={endSession}>
        End session!
      </Button>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})