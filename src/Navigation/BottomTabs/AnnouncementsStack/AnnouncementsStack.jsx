import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { Platform } from "react-native"
import AnnouncementsList from "../../../Screens/Announcements/AnnouncementsList"
import AnnouncementDetails from "../../../Screens/Announcements/AnnouncementDetails"

const ios = Platform.OS === 'ios'
const Stack = ios ? createNativeStackNavigator() : createStackNavigator()

const screenOptions = ios
    ? { headerShown: false, animation: 'slide_from_right' }
    : { headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }

export default function AnnouncementsStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="AnnouncementsList" component={AnnouncementsList} />
            <Stack.Screen name="AnnouncementDetails" component={AnnouncementDetails} />
        </Stack.Navigator>
    )
}
