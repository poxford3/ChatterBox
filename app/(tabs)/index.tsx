import { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SessionView from '@/components/SessionView';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {

  // const params = useLocalSearchParams();
  // const { sessionName } = params;

  const [session, setSession] = useState<Session>();

  const NoSession = () => {
    return (
      <ThemedView>
      <ThemedText>
        No active session, navigate to the `Session Maker Tab` to get started!
      </ThemedText>
    </ThemedView>
    )
  }

  // useEffect(() => {
  //   const fakeUser: User = {
  //     name: "temp name",
  //     password: "temp pass",
  //     email: "temp email"
  // }
  // const newSesh: Session = {
  //     name: sessionName as string,
  //     date: new Date(),
  //     users: [fakeUser]
  // }

  // setSession(newSesh);
  // }, [])

  // test session on screens
  // useEffect(() => {
    // const tempUser: User = {
    //   name: "t user",
    //   password: "t pass",
    //   email: "t email"
    // };
    // const temp: Session = {
    //   name: "test",
    //   date: new Date(),
    //   users: [
    //     tempUser
    //   ]
    // };
  //   setTimeout(() => {
  //     setSession(temp);
  //     console.log('temp set')
  //   }, 3000);
  // }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView>
        <ThemedText type='title'>ChatterBox</ThemedText>
        {session ? <SessionView /> : <NoSession /> }
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
