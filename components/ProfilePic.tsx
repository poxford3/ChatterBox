import React, { useState } from 'react'
import { Image, StyleSheet, PermissionsAndroid, Platform, Alert, Pressable } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText';
import { convertImageToBase64 } from '@/hooks/imgToBase64';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePic() {

  const [image, setImage] = useState("")

  // const test_b64 = convertImageToBase64("https://avatars.githubusercontent.com/u/93592037?v=4");

  const threeButtonAlert = () => {
      Alert.alert('Photo Selection', 'How would you like to select your profile pic?', [
          {
              text: "Photos",
              onPress: openGallery,
          },
          {
            text: "Camera",
            onPress: () => {},
          },
          {
            text: "Cancel",
            style: 'cancel',
            onPress: () => {},
          },
      ])
  }

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permissions',
  //           message: "This app is requesting camera access",
  //           buttonPositive: "Allow",
  //           buttonNeutral: "Ask me later",
  //           buttonNegative: "Deny"
  //         },
  //       )
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.log(err);
  //       return false
  //     }
  //   } else if (Platform.OS === 'ios') {
  //     console.log('ios');
  //     return true;
  //   }
  // }

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    // console.log(result);

    if (!result.canceled) {
      const assets = result.assets;
      const img_b64 = assets[0].base64;
      const img_uri = assets[0].uri;
      const image_output = img_b64 ? `data:image/png;base64, ${img_b64}` : img_uri;
      setImage(image_output);
    }
  }

  return (
    <ThemedView style={styles.imgContainer}>
      <Pressable
        onPress={threeButtonAlert}
      >
        <Image source={{ uri: image ? image : "https://picsum.photos/200" }} style={styles.img} />
      </Pressable>
      <ThemedText>username</ThemedText>
    </ThemedView>
  )
}


const IMG_SIZE = 100;
const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: IMG_SIZE,
        width: IMG_SIZE,
        borderRadius: IMG_SIZE / 2,
        borderWidth: 1,
        borderColor: 'gray',
    }
})
