import React, { useContext, useState } from 'react'
import { Image, StyleSheet, PermissionsAndroid, Platform, Alert, Pressable, TouchableOpacity } from 'react-native'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText';
import { convertImageToBase64 } from '@/hooks/imgToBase64';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { UserContext } from '@/contexts/UserContext';
import { ApiService } from '@/hooks/ApiService';

export default function ProfilePic({ api }: { api: ApiService }) {

  const userContext = useContext(UserContext);
  const user = userContext.user;
  const jwt = userContext.jwt;
  // const api = new ApiService("")

  const [image, setImage] = useState(user?.profilePic);
  const iconColor = useThemeColor({}, "text");

  const updateUser = async (newPic: string) => {
    try {
      let updatedUser = await api.put<User>("/users",{
        id: user?.id,
        name: user?.name,
        profilePic: newPic,
      } ,jwt);
    } catch (err) {
      console.error("error updating user", err);
    }
  }

  // const test_b64 = convertImageToBase64("https://avatars.githubusercontent.com/u/93592037?v=4");

  const threeButtonAlert = () => {
      Alert.alert('Photo Selection', 'How would you like to select your profile pic?', [
          {
              text: "Photos",
              onPress: openGallery,
          },
          {
            text: "Camera",
            onPress: openCamera,
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

    if (!result.canceled) {
      const assets = result.assets;
      const img_b64 = assets[0].base64;
      const img_uri = assets[0].uri;
      const image_output = img_b64 ? `data:image/png;base64, ${img_b64}` : img_uri;
      setImage(image_output);
    }
  }

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
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
      <ThemedView style={styles.header}>
        <ThemedView style={styles.imgContainer}>
          <ThemedView style={{width: 30}} />
          <Pressable
            onPress={threeButtonAlert}
            style={{ padding: 10 }}
          >
            <Image source={{ uri: image ? image : "https://picsum.photos/200" }} style={styles.img} />
          </Pressable>
          <TouchableOpacity onPress={() => {}}>
            <IconSymbol name='gear' color={iconColor} size={30} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedText type='title'>{user?.name}</ThemedText>
      </ThemedView>
  )
}


const IMG_SIZE = 100;
const styles = StyleSheet.create({
    imgContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: IMG_SIZE,
        width: IMG_SIZE,
        borderRadius: IMG_SIZE / 2,
        // borderWidth: 1,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{
        translateY: -30
      }]
    },
})
