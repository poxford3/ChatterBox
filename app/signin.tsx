import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { Button } from 'react-native-paper'
import { TextField } from '@/components/TextField'
import { UserContext } from '@/contexts/UserContext'

export default function Signin() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userContext = useContext(UserContext);

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}
    >
      <ThemedText type='title'>Sign in</ThemedText>
      <View style={{ height: 300 }}>
        <TextField 
          value={username}
          placeholder='Username'
          onChangeText={setUsername}
          style={{margin: 5, height: 50, width: 200}}
        />
        <TextField
          value={password}
          placeholder='Password'
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{margin: 5, height: 50, width: 200 }}
        />
        <Button
          onPress={() => userContext.signin({ username, password} )}
        >
          go
        </Button>
      </View>
    </ThemedView>
  )
}