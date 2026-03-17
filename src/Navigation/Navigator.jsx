import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Platform } from 'react-native'
import SplashScreen from '../Screens/splashScreen'
import { AuthStack } from './AuthStack/AuthStack'
import BottomTabs from './BottomTabs/BottomTabs'

const ios = Platform.OS === 'ios'
const Stack = ios ? createNativeStackNavigator() : createStackNavigator()

const screenOptions = ios
  ? { headerShown: false, animation: 'slide_from_right' }
  : { headerShown: false, gestureEnabled: true, ...TransitionPresets.SlideFromRightIOS }

export const  Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
