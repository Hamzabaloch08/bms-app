import { View, Text, ScrollView, Platform, KeyboardAvoidingView, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import CustomInput from '../../Components/CustomInput'
import CustomButton from '../../Components/CustomButton'
import ScreenHeader from '../../Components/ScreenHeader'
import { CURRENT_USER, getInitials } from '../../data/dummyData'

const Settings = ({ navigation }) => {
    const [name, setName] = useState(CURRENT_USER.name)
    const [email, setEmail] = useState(CURRENT_USER.email)

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScreenHeader title="Edit Profile" navigation={navigation} />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    className="flex-1"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                >
                    {/* Avatar */}
                    <View className="items-center pt-6 pb-6">
                        <View className="w-20 h-20 rounded-full bg-blue-600 items-center justify-center mb-3">
                            <Text className="text-2xl font-bold text-white">{getInitials(CURRENT_USER.name)}</Text>
                        </View>
                        <Pressable onPress={() => Alert.alert('Info', 'Photo upload coming soon.')}>
                            <Text className="text-sm text-blue-600 font-medium">Change Photo</Text>
                        </Pressable>
                    </View>

                    {/* Form */}
                    <View className="px-6">
                        <CustomInput
                            label="Full Name"
                            iconName="account-outline"
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                        />
                        <CustomInput
                            label="Email"
                            iconName="email-outline"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        {/* Read-only fields */}
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-gray-700 mb-1.5">Batch</Text>
                            <View className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-4">
                                <Text className="text-base text-gray-400">{CURRENT_USER.batch}</Text>
                            </View>
                        </View>
                        <View className="mb-4">
                            <Text className="text-sm font-medium text-gray-700 mb-1.5">Cohort</Text>
                            <View className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-4">
                                <Text className="text-base text-gray-400">{CURRENT_USER.cohort}</Text>
                            </View>
                        </View>

                        <View className="mt-2">
                            <CustomButton
                                title="Save Changes"
                                onPress={() => Alert.alert('Success', 'Profile updated successfully.', [
                                    { text: 'OK', onPress: () => navigation.goBack() },
                                ])}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Settings
