import React from 'react';
import { Stack } from "expo-router";
import { UserProvider } from '@/contexts/UserContext';

export default function AuthLayout() {

    return (
        <Stack
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="signup" />
        </Stack>
    )
}