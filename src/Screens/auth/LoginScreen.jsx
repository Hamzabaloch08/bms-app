import { View, Text, Image, Pressable, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomInput from '../../Components/CustomInput'
import CustomButton from '../../Components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/Thunks/AuthThunks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.auth)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim() || isSubmitting) return
    setIsSubmitting(true)

    try {
      let expoPushToken = ''
      try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        expoPushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      } catch (e) {
        console.log('Push token error:', e)
      }
      const payload = { email, password, isMobileApp: true, expoPushToken }
      console.log("payload response", payload)
      const response = await dispatch(loginUser(payload)).unwrap()
      console.log('Login Response:', response)

      if (response.isFirstLogin) return navigation.replace('ChangePassword')

      await AsyncStorage.setItem('token', response.token)
      await AsyncStorage.setItem('user', JSON.stringify(response))

      navigation.getParent()?.replace('BottomTabs')

    } catch (err) {
      Alert.alert('Login Failed', err || 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={'padding'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1 px-8"
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View className="items-center mb-8">
              <Image
                source={require('../../assets/images/splash-logo.png')}
                className="w-40 h-40"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-gray-900 mt-2">
                Welcome Back
              </Text>
              <Text className="text-sm text-gray-400 mt-1">
                Sign in to continue
              </Text>
            </View>

            <CustomInput
              label="Email"
              iconName="email-outline"
              keyboardType="email-address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              error={error}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />

            <CustomInput
              label="Password"
              iconName="lock-outline"
              secureTextEntry
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />

            <Pressable
              className="self-end mb-6"
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text className="text-sm text-blue-600 font-medium">
                Forgot Password?
              </Text>
            </Pressable>

            <CustomButton disabled={isSubmitting || loading} title="Login" onPress={handleLogin} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login
