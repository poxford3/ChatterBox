import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';
import ProfilePic from '@/components/ProfilePic';
import ActivityProfileBox from '@/components/ActivityProfileBox';
import { Button } from 'react-native-paper';
import { UserContext } from '@/contexts/UserContext';
import { ApiService } from '@/hooks/ApiService';

export default function User() {

  const userContext = useContext(UserContext);
  const api = new ApiService("http://localhost:8080");
  

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="person.fill.checkmark"
          style={styles.headerImage}
        />
      }>
        <ThemedView>
            <ProfilePic api={api} />
            <ActivityProfileBox api={api} />
            <Button
              onPress={userContext.signout}
            >sign out</Button>
        </ThemedView>
      </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 40,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
