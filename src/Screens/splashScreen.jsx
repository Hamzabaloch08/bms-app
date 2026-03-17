import { View, Image, Text, Pressable, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { getUserProfile } from '../redux/Thunks/AuthThunks'

const { height } = Dimensions.get('window')

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const hasSeenOnboard = false
    const logoOpacity = useSharedValue(0)
    const logoY = useSharedValue(0)
    const contentOpacity = useSharedValue(0)
    const contentY = useSharedValue(40)
    const btnOpacity = useSharedValue(0)
    const btnY = useSharedValue(30)

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ translateY: logoY.value }],
    }))

    const contentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ translateY: contentY.value }],
    }))

    const btnStyle = useAnimatedStyle(() => ({
        opacity: btnOpacity.value,
        transform: [{ translateY: btnY.value }],
    }))

    useEffect(() => {
        const init = async () => {
            const token = await AsyncStorage.getItem('token')

            if (token) {
                try {
                    // API call to verify token & get fresh user data
                    const result = await dispatch(getUserProfile()).unwrap()
                    console.log('Profile fetched on splash:', result)

                    // Purana token remove, naya user data save
                    await AsyncStorage.removeItem('token')
                    await AsyncStorage.setItem('token', token)
                    await AsyncStorage.setItem('user', JSON.stringify(result.data))

                    logoOpacity.value = withTiming(1, { duration: 1000 })
                    setTimeout(() => navigation.replace('BottomTabs'), 2000)
                    return
                } catch (err) {
                    console.log('Token invalid:', err)
                    await AsyncStorage.multiRemove(['token', 'user'])
                }
            }

        if (hasSeenOnboard) {
            logoOpacity.value = withTiming(1, { duration: 1000 })
            setTimeout(() => navigation.replace('AuthStack'), 2000)
            return
        }

        logoOpacity.value = withTiming(1, { duration: 1500 })
        logoY.value = withDelay(2500, withTiming(-height * 0.15, { duration: 700, easing: Easing.inOut(Easing.ease) }))
        contentOpacity.value = withDelay(3000, withTiming(1, { duration: 600 }))
        contentY.value = withDelay(3000, withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }))
        btnOpacity.value = withDelay(3400, withTiming(1, { duration: 500 }))
        btnY.value = withDelay(3400, withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }))
        }
        init()
    }, [])

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />

            <Animated.View style={logoStyle} className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center">
                <Image
                    source={require('../assets/images/splash-logo.png')}
                    className="w-44 h-44"
                    resizeMode="contain"
                />
            </Animated.View>

            <Animated.View style={contentStyle} className="absolute left-0 right-0 items-center px-10">
                <View style={{ top: height * 0.55 }}>
                    <Text className="text-3xl font-extrabold text-gray-900 text-center">
                        BootCamp Management{'\n'}System
                    </Text>
                    <Text className="text-base text-gray-400 text-center mt-4 leading-6">
                        Track assignments, view announcements,{'\n'}and monitor your daily progress.
                    </Text>
                </View>
            </Animated.View>

            <Animated.View style={btnStyle} className="absolute bottom-0 left-0 right-0 px-8 pb-10">
                <Pressable
                    className="bg-blue-600 py-4 rounded-2xl items-center active:bg-blue-700"
                    onPress={() => navigation.replace('AuthStack')}
                >
                    <Text className="text-white text-base font-semibold">
                        Get Started
                    </Text>
                </Pressable>
                <Text className="text-gray-300 text-xs text-center mt-4">
                    By continuing, you agree to our Terms of Service
                </Text>
            </Animated.View>
        </View>
    )
}

export default SplashScreen
