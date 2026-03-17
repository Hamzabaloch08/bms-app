import { View, Text, TextInput } from 'react-native'
import React, { useRef } from 'react'

const OtpInput = ({ length = 6, value = '', onChange, error }) => {
    const inputRefs = useRef([])

    const handleChange = (digit, index) => {
        const newOtp = value.split('')
        newOtp[index] = digit
        const otpString = newOtp.join('')
        onChange(otpString)

        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <View className="mb-4">
            <View className="flex-row justify-between gap-3">
                {Array.from({ length }).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-4"
                        style={{ fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', padding: 0, margin: 0, includeFontPadding: false, textAlignVertical: 'center' }}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={value[index] || ''}
                        onChangeText={(digit) => handleChange(digit, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                ))}
            </View>
            {error && (
                <Text className="text-xs text-red-500 mt-2 text-center">{error}</Text>
            )}
        </View>
    )
}

export default OtpInput
