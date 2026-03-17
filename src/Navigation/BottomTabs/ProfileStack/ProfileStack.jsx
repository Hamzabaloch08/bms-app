import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { Platform } from "react-native"
import Profile from "../../../Screens/Profile/Profile"
import Settings from "../../../Screens/Profile/Settings"

const ios = Platform.OS === 'ios'
const Stack = ios ? createNativeStackNavigator() : createStackNavigator()

const screenOptions = ios
    ? { headerShown: false, animation: 'slide_from_right' }
    : { headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }

export default function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    )
}
