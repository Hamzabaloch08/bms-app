import { View, Text, TextInput } from 'react-native'
import React from 'react'

const CustomTextArea = ({ label, value, onChangeText, placeholder, numberOfLines = 4, error }) => {
    return (
        <View className="mb-4">
            {label && (
                <Text className="text-sm font-medium text-gray-700 mb-1.5">{label}</Text>
            )}
            <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                style={{
                    fontSize: 16,
                    color: '#111827',
                    includeFontPadding: false,
                    textAlignVertical: 'top',
                    minHeight: numberOfLines * 28,
                }}
                multiline
                numberOfLines={numberOfLines}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
            />
            {error && (
                <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>
            )}
        </View>
    )
}

export default CustomTextArea
