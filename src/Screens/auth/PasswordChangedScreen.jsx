import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PasswordChangedScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <MaterialCommunityIcons name="check-circle" size={80} color="#16a34a" />
            <Text className="text-2xl font-bold text-gray-900 mt-4">
                Password Changed!
            </Text>
            <Text className="text-sm text-gray-400 mt-2">
                Redirecting to login...
            </Text>
        </SafeAreaView>
    )
}

export default PasswordChangedScreen
