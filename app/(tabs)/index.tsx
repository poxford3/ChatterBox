import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SessionView from '@/components/SessionView';
import Stopwatch from '@/components/Stopwatch';
import { SessionContext } from '@/contexts/SessionContext';
import { Button, ToggleButton } from 'react-native-paper';
import { TextField } from '@/components/TextField';
import ExerciseMaker from '@/components/ExerciseMaker';
import { UserContext } from '@/contexts/UserContext';
import NoSession from '@/components/NoSession';

export default function HomeScreen() {

  const seshState = useContext(SessionContext);
  const session = seshState.session;
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={{padding: 10,}}>
        <ThemedText type='title'>ChatterBox</ThemedText>
        {session && session.active ? <SessionView /> : <NoSession /> }
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
