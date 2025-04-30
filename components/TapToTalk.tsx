import React, { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';
import { IconSymbol } from './ui/IconSymbol';



export default function PulsingButton() {
    const scale = useRef(new Animated.Value(1)).current;
    const pulseAnim = useRef<Animated.CompositeAnimation | null>(null);
    const theme = useTheme();
    const [isSpeaking, setIsSpeaking] = useState(false);


    const startPulse = () => {
      setIsSpeaking(true);
        pulseAnim.current = Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 1.1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ])
        );
        pulseAnim.current.start();
      };
    
      const stopPulse = () => {
        setIsSpeaking(false);
        pulseAnim.current?.stop();
        scale.setValue(1);
      };
      return (
        <PaperProvider>
            <Pressable
              onPressIn={startPulse}
              onPressOut={stopPulse}
              style={[styles.tapBtn, {
                backgroundColor: theme.colors.primary,
                borderColor: isSpeaking ? 'green' : undefined,
                borderWidth: isSpeaking ? 4 : 0.5,
              }]}
            >
              <Animated.View style={{ transform: [{ scale }] }}>
                <IconSymbol name='microphone.fill' color={'white'} size={34} />
              </Animated.View>
            </Pressable>
        </PaperProvider>
      );
  };

let BTN_SIZE = 200;
const styles = StyleSheet.create({
    tapBtn: {
        
        alignItems: 'center',
        justifyContent: 'center',
        height: BTN_SIZE,
        width: BTN_SIZE,
        borderRadius: BTN_SIZE / 2,
        padding: 5,
        margin: 10,
        // opacity: 
    }
})