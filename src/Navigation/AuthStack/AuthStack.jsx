import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import Login from "../../Screens/auth/LoginScreen";
import ForgotPassword from "../../Screens/auth/ForgotPasswordScreen";
import ChangePassword from "../../Screens/auth/ChangePasswordScreen";
import PasswordChanged from "../../Screens/auth/PasswordChangedScreen";

const ios = Platform.OS === "ios"

const Stack = ios ? createNativeStackNavigator() : createStackNavigator();

export const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
    </Stack.Navigator>
)