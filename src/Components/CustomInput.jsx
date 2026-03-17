import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    iconName,
    secureTextEntry = false,
    keyboardType = 'default',
    error,
    ...rest
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
        <View className="mb-4">
            {label && (
                <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>
            )}
            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
                {iconName && (
                    <MaterialCommunityIcons name={iconName} size={20} color="#9CA3AF" />
                )}
                <TextInput
                    className="flex-1 ml-3"
                    style={{ fontSize: 16, color: '#111827', padding: 0, margin: 0, includeFontPadding: false, textAlignVertical: 'center' }}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    {...rest}
                />
                {secureTextEntry && (
                    <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                        <MaterialCommunityIcons
                            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color="#9CA3AF"
                        />
                    </Pressable>
                )}
            </View>
            {error && (
                <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>
            )}
        </View>
    )
}

export default CustomInput
