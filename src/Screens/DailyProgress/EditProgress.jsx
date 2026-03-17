import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Alert, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../Components/CustomButton'
import CustomInput from '../../Components/CustomInput'
import CustomTextArea from '../../Components/CustomTextArea'
import ScreenHeader from '../../Components/ScreenHeader'
import { updateProgress, getMyProgress } from '../../redux/Thunks/DailyProgressThunks'

const EditProgress = ({ route, navigation }) => {
    const { progress } = route.params
    const [yesterday, setYesterday] = useState(progress.yesterdayWork || '')
    const [today, setToday] = useState(progress.todayPlan || '')
    const [blockers, setBlockers] = useState(progress.blockers === 'none' ? '' : (progress.blockers || ''))
    const [githubLink, setGithubLink] = useState(progress.githubLink || '')
    const [hoursWorked, setHoursWorked] = useState(String(progress.hoursWorked || ''))

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.dailyProgress)

    const handleUpdate = () => {
        Alert.alert('Confirm Update', 'Are you sure you want to update this progress?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Update', onPress: async () => {
                    try {
                        const payload = {
                            id: progress._id,
                            yesterdayWork: yesterday,
                            todayPlan: today,
                            blockers: blockers || 'none',
                            githubLink,
                            hoursWorked,
                        }
                        await dispatch(updateProgress(payload)).unwrap()
                        await dispatch(getMyProgress())
                        Alert.alert('Success', 'Progress updated successfully!')
                        navigation.goBack()
                    } catch (err) {
                        Alert.alert('Error', err || 'Something went wrong')
                    }
                }
            },
        ])
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={'padding'}
        >
            <ScreenHeader title="Edit Progress" navigation={navigation} />
            <ScrollView
                className="flex-1"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className="px-6 mt-4">
                    {/* Mentor Feedback */}
                    {progress.feedback && (
                        <View className="bg-green-50 rounded-2xl p-4 mb-4">
                            <View className="flex-row items-center gap-1.5 mb-2">
                                <MaterialCommunityIcons name="message-reply-text-outline" size={16} color="#16A34A" />
                                <Text className="text-sm font-semibold text-green-600">Mentor Feedback</Text>
                            </View>
                            <Text className="text-sm text-green-800 leading-5">{progress.feedback}</Text>
                        </View>
                    )}

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

                    <View className="mt-2 mb-6">
                        <CustomButton
                            title="Update Progress"
                            onPress={handleUpdate}
                            loading={loading}
                            disabled={loading}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditProgress
