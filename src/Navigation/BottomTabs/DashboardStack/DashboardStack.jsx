import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { Platform } from "react-native"
import Dashboard from "../../../Screens/dashboard/Dashboard"
import Leaderboard from "../../../Screens/dashboard/Leaderboard"
import NotificationsScreen from "../../../Screens/dashboard/NotificationsScreen"

const ios = Platform.OS === 'ios'
const Stack = ios ? createNativeStackNavigator() : createStackNavigator()

const screenOptions = ios
    ? { headerShown: false, animation: 'slide_from_right' }
    : { headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }

export default function DashboardStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="DashboardHome" component={Dashboard} />
            <Stack.Screen name="Leaderboard" component={Leaderboard} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
    )
}
