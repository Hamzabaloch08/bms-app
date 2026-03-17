import { Navigator } from './src/Navigation/Navigator'
import "./global.css"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './src/redux/Store/store'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useEffect, useRef } from 'react'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        })
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            console.log('Push notification permission denied')
            return
        }
    }
}

const App = () => {

    useEffect(() => {
        registerForPushNotificationsAsync()

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification)
        })

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification tapped:', response)
        })

        return () => {
            notificationListener.remove()
            responseListener.remove()
        }
    }, [])

    return (
        <Provider store={store}>
            <SafeAreaProvider style={{ flex: 1 }}>
                <Navigator />
            </SafeAreaProvider>
        </Provider>
    )
}

export default App