import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { Platform } from "react-native"
import DailyProgress from "../../../Screens/DailyProgress/DailyProgress"
import ProgressHistory from "../../../Screens/DailyProgress/ProgressHistory"
import EditProgress from "../../../Screens/DailyProgress/EditProgress"

const ios = Platform.OS === 'ios'
const Stack = ios ? createNativeStackNavigator() : createStackNavigator()

const screenOptions = ios
    ? { headerShown: false, animation: 'slide_from_right' }
    : { headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }

export default function ProgressStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="DailyProgress" component={DailyProgress} />
            <Stack.Screen name="ProgressHistory" component={ProgressHistory} />
            <Stack.Screen name="EditProgress" component={EditProgress} />
        </Stack.Navigator>
    )
}
