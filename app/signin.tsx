import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { TextInput } from 'react-native-paper'
import { TextField } from '@/components/TextField'

export default function Signin() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <ThemedText type='title'>Sign in</ThemedText>
      <TextField 
        value={username}
        placeholder='Username'
        onChangeText={setUsername}
        style={{margin: 5}}
      />
      <TextField
        value={password}
        placeholder='Password'
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{margin: 5}}
      />
    </ThemedView>
  )
}