import React, { useState } from 'react'
import { StyleSheet, Image, Pressable } from 'react-native'

export default function SpeakerPic() {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const onPressIn = () => {
        setIsSpeaking(true);
    }

    const onPressOut = () => {
        setIsSpeaking(false);
    }

    return (
        <Pressable 
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
            borderColor: isSpeaking ? 'green' : undefined,
            borderWidth: isSpeaking ? 3 : 0.5,
            borderRadius: iconSize / 2,
            margin: 5,
        }}>
        <Image
            style={styles.pic}
            // source={{ uri: "https://media.licdn.com/dms/image/v2/C4D03AQGaSSmb55PdQw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1647202343449?e=1751500800&v=beta&t=pwj3a-KrNSlj2iseTu9oy6pJlKq6OChC881vmquRLN8" }}
            source={require("../assets/images/bike.jpg")}
        />
        </Pressable>
    )
};

const iconSize = 80;
const styles = StyleSheet.create({
    pic: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: iconSize,
        width: iconSize,
        borderRadius: iconSize / 2,
        margin: 5
    }
  });