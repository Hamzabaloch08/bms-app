import { View, Text, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CustomInput from '../../Components/CustomInput'
import CustomButton from '../../Components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/Thunks/AuthThunks'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()
    const { loading, error, token, user } = useSelector(state => state.auth)

    const handleChangePassword = async () => {
        const newErrors = {}

        if (!currentPassword) newErrors.currentPassword = 'Current password is required'
        if (!newPassword) {
            newErrors.newPassword = 'New password is required'
        } else if (newPassword === currentPassword) {
            newErrors.newPassword = 'New password must be different from current'
        }

        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        try {
            const response = await dispatch(changePassword({ oldPassword: currentPassword, newPassword, token })).unwrap()
            console.log('Change Password Response:', response)
            await AsyncStorage.setItem('token', token)
            await AsyncStorage.setItem('user', JSON.stringify(user))
            console.log('Saved user:', user)
            navigation.getParent()?.replace('BottomTabs')
        } catch (err) {
            Alert.alert('Error', err || 'Something went wrong')
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={'padding'}
            >
                <ScrollView
                    className="flex-1 px-8"
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="items-center mb-6">
                        <View className="w-20 h-20 rounded-full bg-blue-50 items-center justify-center">
                            <MaterialCommunityIcons name="lock-reset" size={40} color="#2563EB" />
                        </View>
                    </View>

                    <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                        Change Password
                    </Text>
                    <Text className="text-sm text-gray-400 text-center mb-8">
                        You must change your password{'\n'}before continuing
                    </Text>

                    {error && (
                        <Text className="text-xs text-red-500 text-center mb-4">{error}</Text>
                    )}

                    <CustomInput
                        label="Current Password"
                        iconName="lock-outline"
                        secureTextEntry
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        error={errors.currentPassword}
                    />
                    <CustomInput
                        label="New Password"
                        iconName="lock-plus-outline"
                        secureTextEntry
                        placeholder="Enter new password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        error={errors.newPassword}
                    />


                    <View className="mt-4">
                        <CustomButton disabled={loading} title="Change Password" onPress={handleChangePassword} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChangePasswordScreen
