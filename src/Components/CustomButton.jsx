import { Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    className: extraClassName = '',
}) => {
    const isOutline = variant === 'outline'

    return (
        <Pressable
            className={`py-4 rounded-2xl items-center ${
                isOutline
                    ? 'border border-blue-600 bg-transparent'
                    : 'bg-blue-600 active:bg-blue-700'
            } ${disabled || loading ? 'opacity-50' : ''} ${extraClassName}`}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color={isOutline ? '#2563EB' : '#FFFFFF'} />
            ) : (
                <Text
                    className={`text-base font-semibold ${
                        isOutline ? 'text-blue-600' : 'text-white'
                    }`}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    )
}

export default CustomButton
