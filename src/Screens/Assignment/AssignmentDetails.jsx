import { View, Text, ScrollView, Pressable, KeyboardAvoidingView, Alert, Linking, Platform } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as DocumentPicker from 'expo-document-picker'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../../Components/CustomInput'
import CustomTextArea from '../../Components/CustomTextArea'
import CustomButton from '../../Components/CustomButton'
import ScreenHeader from '../../Components/ScreenHeader'
import { submitAssignment, getAllAssignments } from '../../redux/Thunks/AssignmentThunks'

const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const LINK_FIELDS = {
    frontendGithubUrl: { label: 'Frontend GitHub URL', icon: 'github', placeholder: 'https://github.com/...' },
    backendGithubUrl: { label: 'Backend GitHub URL', icon: 'github', placeholder: 'https://github.com/...' },
    deployedUrl: { label: 'Deployed URL', icon: 'web', placeholder: 'https://...' },
    behanceUrl: { label: 'Behance URL', icon: 'brush-variant', placeholder: 'https://behance.net/...' },
    figmaUrl: { label: 'Figma URL', icon: 'pencil-ruler', placeholder: 'https://figma.com/...' },
}

const AssignmentDetails = ({ route, navigation }) => {
    const { assignment } = route.params
    const requiredLinks = assignment.requiredLinks || []

    const [linkValues, setLinkValues] = useState(() => {
        const initial = {}
        requiredLinks.forEach(key => { initial[key] = '' })
        return initial
    })
    const [note, setNote] = useState('')
    const [referenceFile, setReferenceFile] = useState(null)

    const updateLink = (key, value) => {
        setLinkValues(prev => ({ ...prev, [key]: value }))
    }

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.assignments)
    const { user } = useSelector(state => state.auth)

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: '*/*' })
            if (!result.canceled) {
                setReferenceFile(result.assets[0])
            }
        } catch (error) {
            console.log('File pick error:', error)
        }
    }

    const handleSubmit = () => {
        const emptyField = requiredLinks.find(key => !linkValues[key]?.trim())
        if (emptyField) {
            return Alert.alert('Error', `${LINK_FIELDS[emptyField]?.label || emptyField} is required`)
        }

        Alert.alert('Confirm Submission', 'Once submitted, you cannot modify unless the teacher requests resubmission.', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Submit', onPress: async () => {
                    try {
                        const payload = {
                            assignment: assignment._id,
                            student: user?.userId,
                            mentor: assignment.teacher?._id,
                            ...linkValues,
                            note,
                            referenceFile,
                        }
                        await dispatch(submitAssignment(payload)).unwrap()
                        await dispatch(getAllAssignments())
                        Alert.alert('Success', 'Assignment submitted successfully!')
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
            keyboardVerticalOffset={0}
        >
            <ScreenHeader title="Assignment Details" navigation={navigation} />
            <ScrollView
                className="flex-1"
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                keyboardDismissMode="interactive"
                nestedScrollEnabled={true}
            >
                <View className="flex-row items-center px-6 pt-4 mb-2">
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400 ml-1">{formatDeadline(assignment.deadline)}</Text>
                </View>

                <View className="px-6">
                    <Text className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</Text>
                    <Text className="text-sm text-gray-400 mb-4">{assignment.description}</Text>
                </View>

                {assignment.documentUrl && (
                    <Pressable
                        className="mx-6 mb-4 bg-gray-50 rounded-xl p-4 flex-row items-center justify-between"
                        onPress={() => Linking.openURL(assignment.documentUrl)}
                    >
                        <View className="flex-row items-center">
                            <MaterialCommunityIcons name="file-document-outline" size={20} color="#2563EB" />
                            <Text className="text-sm font-medium text-gray-900 ml-2">Assignment Document</Text>
                        </View>
                        <MaterialCommunityIcons name="open-in-new" size={18} color="#9CA3AF" />
                    </Pressable>
                )}

                {assignment.isSubmit ? (
                    /* Already Submitted View */
                    <View className="mx-6 bg-green-50 rounded-2xl p-4 mt-2">
                        <View className="flex-row items-center mb-3">
                            <MaterialCommunityIcons name="check-circle" size={20} color="#16A34A" />
                            <Text className="text-base font-semibold text-green-800 ml-2">Already Submitted</Text>
                        </View>
                        <Text className="text-sm text-green-700">
                            You have already submitted this assignment. You cannot resubmit unless the teacher requests resubmission.
                        </Text>
                    </View>
                ) : (
                    /* Submission Form */
                    <View className="mx-6 bg-gray-50 rounded-2xl p-4 mt-2">
                        <Text className="text-base font-semibold text-gray-900 mb-4">Submit Your Work</Text>

                        {requiredLinks.map(key => {
                            const field = LINK_FIELDS[key]
                            if (!field) return null
                            return (
                                <CustomInput
                                    key={key}
                                    label={field.label}
                                    iconName={field.icon}
                                    placeholder={field.placeholder}
                                    value={linkValues[key]}
                                    onChangeText={(val) => updateLink(key, val)}
                                />
                            )
                        })}
                        <CustomTextArea
                            label="Note"
                            placeholder="Any notes for the reviewer..."
                            value={note}
                            onChangeText={setNote}
                            numberOfLines={3}
                        />

                        {/* File Picker - only if referenceFile is required */}
                        {requiredLinks.includes('referenceFile') && (
                            <Pressable
                                className="bg-white border border-gray-200 rounded-xl p-4 flex-row items-center justify-between mb-4"
                                onPress={pickFile}
                            >
                                <View className="flex-row items-center">
                                    <MaterialCommunityIcons name="paperclip" size={20} color="#6B7280" />
                                    <Text className="text-sm text-gray-500 ml-2">
                                        {referenceFile ? referenceFile.name : 'Attach Reference File'}
                                    </Text>
                                </View>
                                <MaterialCommunityIcons name="upload" size={18} color="#9CA3AF" />
                            </Pressable>
                        )}

                        <View className="flex-row items-start mb-4 bg-amber-50 rounded-xl p-3">
                            <MaterialCommunityIcons name="alert-circle-outline" size={18} color="#F59E0B" />
                            <Text className="text-xs text-amber-700 ml-2 flex-1">
                                After submitting, you cannot change this unless the teacher requests resubmission.
                            </Text>
                        </View>
                        <CustomButton disabled={assignment.isSubmit || loading} title="Finalize Submission" onPress={handleSubmit} />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AssignmentDetails
