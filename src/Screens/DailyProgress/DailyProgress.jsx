import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import CustomTextArea from '../../Components/CustomTextArea'

import { submitProgress } from '../../redux/Thunks/DailyProgressThunks'

const DailyProgress = ({ navigation }) => {
    const [yesterday, setYesterday] = useState('')
    const [today, setToday] = useState('')
    const [blockers, setBlockers] = useState('')
    const [githubLink, setGithubLink] = useState('')
    const [hoursWorked, setHoursWorked] = useState('')
    const [needMentor, setNeedMentor] = useState(false)

    const dispatch = useDispatch()


    const createProgress = async () => {
        try {
            const payload = {
                yesterdayWork: yesterday,
                todayPlan: today,
                blockers: blockers || 'none',
                githubLink,
                hoursWorked,
                needMentor,
            }
            console.log(payload)
            const response = await dispatch(submitProgress(payload)).unwrap();
            console.log("submit response", response)
            Alert.alert('Success', 'Progress submitted successfully')
            setBlockers('')
            setGithubLink('')
            setHoursWorked('')
            setToday('')
            setYesterday('')
            setNeedMentor(false)
        } catch (error) {
            Alert.alert('Error', error || 'Something went wrong')
        }
    }


    const todayDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={'padding'}
            >
                {/* Header */}
                <View className="px-6 pt-2 pb-2">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-2xl font-bold text-gray-900">Daily Progress</Text>
                        <Pressable onPress={() => navigation.navigate('ProgressHistory')}>
                            <Text className="text-sm text-blue-600 font-medium">View History</Text>
                        </Pressable>
                    </View>
                    <View className="flex-row items-center gap-2 mt-2">
                        <View className="bg-gray-100 rounded-lg px-3 py-1">
                            <Text className="text-xs text-gray-600">{todayDate}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    className="flex-1"
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                >
                    {/* Form */}
                    <View className="px-6 mt-4">
                        <CustomTextArea
                            label="What did you work on yesterday?"
                            placeholder="Describe your tasks and accomplishments..."
                            value={yesterday}
                            onChangeText={setYesterday}
                            numberOfLines={4}
                        />
                        <CustomTextArea
                            label="What is your plan for today?"
                            placeholder="Outline your goals for the next 24 hours..."
                            value={today}
                            onChangeText={setToday}
                            numberOfLines={4}
                        />

                        {/* Blockers Section */}
                        <View className="bg-amber-50 rounded-2xl p-4 mb-4">
                            <View className="flex-row items-center mb-3">
                                <MaterialCommunityIcons name="alert-outline" size={18} color="#F59E0B" />
                                <Text className="text-sm font-semibold text-gray-900 ml-2">Any Blockers?</Text>
                            </View>
                            <CustomTextArea
                                placeholder="Describe any challenges or issues you are facing..."
                                value={blockers}
                                onChangeText={setBlockers}
                                numberOfLines={3}
                            />
                        </View>

                        <CustomInput
                            label="GitHub Link"
                            iconName="github"
                            placeholder="https://github.com/..."
                            value={githubLink}
                            onChangeText={setGithubLink}
                            keyboardType="url"
                        />
                        <CustomInput
                            label="Hours Worked"
                            iconName="clock-outline"
                            placeholder="e.g. 6"
                            value={hoursWorked}
                            onChangeText={setHoursWorked}
                            keyboardType="numeric"
                        />

                        {/* Need Mentor Checkbox */}
                        <Pressable
                            onPress={() => setNeedMentor(!needMentor)}
                            className="flex-row items-center mb-4"
                        >
                            <MaterialCommunityIcons
                                name={needMentor ? 'checkbox-marked' : 'checkbox-blank-outline'}
                                size={24}
                                color={needMentor ? '#3B82F6' : '#9CA3AF'}
                            />
                            <Text className="text-sm text-gray-700 ml-2">I need a mentor for guidance</Text>
                        </Pressable>

                        {/* Action Button */}
                        <View className="mt-2 mb-6">
                            <CustomButton
                                title="Submit Progress"
                                onPress={createProgress}
                            />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default DailyProgress
