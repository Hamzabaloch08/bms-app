import { View, Text, Pressable, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CustomInput from '../../Components/CustomInput'
import CustomButton from '../../Components/CustomButton'
import OtpInput from '../../Components/OtpInput'
import { useDispatch, useSelector } from 'react-redux'
import { sendResetPasswordEmail, verifyOtp } from '../../redux/Thunks/AuthThunks'

const ForgotPasswordScreen = ({ navigation }) => {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.auth)

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            navigation.goBack()
        }
    }

    const handleSendOtp = async () => {
        if (!email.trim()) return Alert.alert('Error', 'Email is required')
        try {
            await dispatch(sendResetPasswordEmail(email)).unwrap()
            setStep(2)
        } catch (err) {
            Alert.alert('Error', err || 'Something went wrong')
        }
    }

    const handleVerifyAndReset = async () => {
        if (otp.length !== 6) return Alert.alert('Error', 'Enter the complete 6-digit code')
        if (!newPassword) return Alert.alert('Error', 'Password is required')
        if (newPassword.length < 8) return Alert.alert('Error', 'Password must be at least 8 characters')
        try {
            await dispatch(verifyOtp({ email, otp, newPassword })).unwrap()
            navigation.replace('PasswordChanged')
        } catch (err) {
            Alert.alert('Error', err || 'Something went wrong')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Header */}
                <View className="flex-row items-center px-4 pt-2 pb-4">
                    <Pressable onPress={handleBack} className="p-2">
                        <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
                    </Pressable>
                    <Text className="text-lg font-semibold text-gray-900 ml-2">
                        Forgot Password
                    </Text>
                </View>

                {/* Step indicator */}
                <View className="flex-row px-8 mb-6 gap-2">
                    {[1, 2].map((i) => (
                        <View
                            key={i}
                            className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        />
                    ))}
                </View>

                <ScrollView
                    className="flex-1 px-8"
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Step 1: Enter Email */}
                    {step === 1 && (
                        <View>
                            <Text className="text-xl font-bold text-gray-900 mb-2">
                                Enter your email
                            </Text>
                            <Text className="text-sm text-gray-400 mb-8">
                                We'll send a verification code to your email
                            </Text>
                            <CustomInput
                                label="Email"
                                iconName="email-outline"
                                keyboardType="email-address"
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <View className="mt-4">
                                <CustomButton title="Send OTP" onPress={handleSendOtp} loading={loading} />
                            </View>
                        </View>
                    )}

                    {/* Step 2: OTP + New Password */}
                    {step === 2 && (
                        <View>
                            <Text className="text-xl font-bold text-gray-900 mb-2">
                                Verify & Reset Password
                            </Text>
                            <Text className="text-sm text-gray-400 mb-8">
                                Enter the 6-digit code sent to{'\n'}{email}
                            </Text>
                            <OtpInput
                                length={6}
                                value={otp}
                                onChange={setOtp}
                            />
                            <CustomInput
                                label="New Password"
                                iconName="lock-outline"
                                secureTextEntry
                                placeholder="Enter new password"
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                            <View className="mt-4">
                                <CustomButton title="Reset Password" onPress={handleVerifyAndReset} loading={loading} />
                            </View>
                            <Pressable onPress={handleSendOtp} className="mt-4">
                                <Text className="text-sm text-blue-600 text-center font-medium">
                                    Didn't receive code? Resend
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen
