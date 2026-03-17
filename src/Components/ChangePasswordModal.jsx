import { View, Text, Modal, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'

const ChangePasswordModal = ({ visible, onSuccess }) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleChangePassword = () => {
        const newErrors = {}

        if (!currentPassword) {
            newErrors.currentPassword = 'Current password is required'
        }
        if (!newPassword) {
            newErrors.newPassword = 'New password is required'
        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters'
        } else if (newPassword === currentPassword) {
            newErrors.newPassword = 'New password must be different from current'
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {
            onSuccess()
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => Alert.alert('Required', 'You must change your password before continuing.')}
        >
            <SafeAreaView className="flex-1 bg-white">
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={-40}
                >
                    <ScrollView
                        className="flex-1 px-8"
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        keyboardShouldPersistTaps="handled"
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
                        <CustomInput
                            label="Confirm New Password"
                            iconName="lock-check-outline"
                            secureTextEntry
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            error={errors.confirmPassword}
                        />

                        <View className="mt-4">
                            <CustomButton title="Change Password" onPress={handleChangePassword} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    )
}

export default ChangePasswordModal
