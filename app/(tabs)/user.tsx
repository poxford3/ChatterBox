import React from 'react'
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ThemedView } from '@/components/ThemedView';
import ProfilePic from '@/components/ProfilePic';
import ActivityProfileBox from '@/components/ActivityProfileBox';

export default function User() {

  let testUser: User = {
      id: 'testid',
      name: 'test',
      email: 'testemail',
      password: 'test',
      profilePic: ''
      // friendsCount: 10,
    }

  // useEffect(() => {

  // }, [user])

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
            <ProfilePic />
            <ActivityProfileBox user={testUser} />
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
