import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ProfileMenuItem = ({ iconName, label, onPress, danger = false }) => {
    return (
        <Pressable
            className="flex-row items-center py-4 border-b border-gray-100"
            onPress={onPress}
        >
            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-3">
                <MaterialCommunityIcons
                    name={iconName}
                    size={20}
                    color={danger ? '#EF4444' : '#6B7280'}
                />
            </View>
            <Text className={`flex-1 text-base ${danger ? 'text-red-500 font-medium' : 'text-gray-900'}`}>
                {label}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#D1D5DB" />
        </Pressable>
    )
}

export default ProfileMenuItem
