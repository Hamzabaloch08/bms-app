import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { Platform } from "react-native"
import AssignmentList from "../../../Screens/Assignment/AssignmentList"
import AssignmentDetails from "../../../Screens/Assignment/AssignmentDetails"
import SubmissionDetails from "../../../Screens/Assignment/SubmissionDetails"


const ios = Platform.OS === 'ios'
const Stack = ios ? createNativeStackNavigator() : createStackNavigator()

const screenOptions = ios
    ? { headerShown: false, animation: 'slide_from_right' }
    : { headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }

export default function AssignmentsStack() {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="AssignmentList" component={AssignmentList} />
            <Stack.Screen name="AssignmentDetails" component={AssignmentDetails} />
            <Stack.Screen name="SubmissionDetails" component={SubmissionDetails} />
        </Stack.Navigator>
    )
}
