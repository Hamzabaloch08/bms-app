import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import ProfileMenuItem from '../../Components/ProfileMenuItem'
import { getInitials } from '../../data/dummyData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { clearState } from '../../redux/Slices/AuthSlice'
import { logoutUser } from '../../redux/Thunks/AuthThunks'

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.multiRemove(['token', 'user'])
                    dispatch(logoutUser())
                    dispatch(clearState())
                    navigation.getParent()?.getParent()?.replace('AuthStack')
                },
            },
        ])
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Avatar Section */}
                <View className="items-center pt-8 pb-6">
                    <View className="w-20 h-20 rounded-full bg-blue-600 items-center justify-center mb-3">
                        <Text className="text-2xl font-bold text-white">{user?.name ? getInitials(user.name) : ''}</Text>
                    </View>
                    <Text className="text-xl font-bold text-gray-900">{user?.name}</Text>
                    <Text className="text-sm text-gray-400 mt-1">{user?.email}</Text>
                    <View className="bg-blue-50 px-3 py-1 rounded-full mt-2">
                        <Text className="text-xs text-blue-600 font-medium">Roll No: {user?.rollNo}</Text>
                    </View>
                    <View className="bg-purple-50 px-3 py-1 rounded-full mt-2">
                        <Text className="text-xs text-purple-600 font-medium capitalize">{user?.role}</Text>
                    </View>
                    <View className="bg-green-50 px-3 py-1 rounded-full mt-2">
                        <Text className="text-xs text-green-600 font-medium capitalize">{user?.studentStatus}</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View className="px-6">
                    <ProfileMenuItem
                        iconName="account-edit-outline"
                        label="Edit Profile"
                        onPress={() => navigation.navigate('Settings')}
                    />
                    <ProfileMenuItem
                        iconName="lock-outline"
                        label="Change Password"
                        onPress={() => Alert.alert('Info', 'Change password feature coming soon.')}
                    />
                    <ProfileMenuItem
                        iconName="bell-outline"
                        label="Notifications"
                        onPress={() => Alert.alert('Info', 'Notification settings coming soon.')}
                    />
                    <ProfileMenuItem
                        iconName="information-outline"
                        label="About"
                        onPress={() => Alert.alert('BMS App', 'Bootcamp Management System\nVersion 1.0.0')}
                    />
                    <View className="mt-4" />
                    <ProfileMenuItem
                        iconName="logout"
                        label="Logout"
                        danger
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile
