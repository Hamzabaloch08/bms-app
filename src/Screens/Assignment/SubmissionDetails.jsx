import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '../../Components/ScreenHeader'

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const STATUS_CONFIG = {
    approved: { label: 'Approved', color: '#16A34A', bg: '#F0FDF4', icon: 'check-circle' },
    pending: { label: 'Pending Review', color: '#F59E0B', bg: '#FFFBEB', icon: 'clock-outline' },
}

const SubmissionDetails = ({ route, navigation }) => {
    const { submission } = route.params
    const hasFeedback = !!submission.feedback
    const statusConfig = STATUS_CONFIG[submission.status] || STATUS_CONFIG.pending

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title="Submission Details" navigation={navigation} />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Assignment Info */}
                <View className="px-6 pt-4">
                    <Text className="text-xl font-bold text-gray-900 mb-2">{submission.assignment?.title || 'Untitled Assignment'}</Text>
                    <Text className="text-sm text-gray-400 mb-4">{submission.assignment?.description || ''}</Text>

                    <View className="flex-row items-center gap-4 mb-4">
                        {submission.assignment?.deadline && (
                            <View className="flex-row items-center gap-1">
                                <MaterialCommunityIcons name="clock-outline" size={14} color="#9CA3AF" />
                                <Text className="text-xs text-gray-400">Due: {formatDate(submission.assignment.deadline)}</Text>
                            </View>
                        )}
                        <View className="flex-row items-center gap-1">
                            <MaterialCommunityIcons name="calendar-check-outline" size={14} color="#9CA3AF" />
                            <Text className="text-xs text-gray-400">Submitted: {formatDate(submission.createdAt)}</Text>
                        </View>
                    </View>

                    {/* Status Badge */}
                    <View className="flex-row items-center gap-1.5 rounded-full px-3 py-1.5 self-start mb-4" style={{ backgroundColor: statusConfig.bg }}>
                        <MaterialCommunityIcons name={statusConfig.icon} size={14} color={statusConfig.color} />
                        <Text className="text-xs font-semibold" style={{ color: statusConfig.color }}>{statusConfig.label}</Text>
                    </View>
                </View>

                {/* Submitted Links */}
                <View className="mx-6 bg-gray-50 rounded-2xl p-4 mb-4">
                    <Text className="text-base font-semibold text-gray-900 mb-3">Your Submission</Text>

                    {submission.frontendGithubUrl && (
                        <View className="mb-3">
                            <Text className="text-xs font-semibold text-gray-500 mb-1">Frontend GitHub</Text>
                            <Text className="text-sm text-blue-600" selectable>{submission.frontendGithubUrl}</Text>
                        </View>
                    )}

                    {submission.backendGithubUrl && (
                        <View className="mb-3">
                            <Text className="text-xs font-semibold text-gray-500 mb-1">Backend GitHub</Text>
                            <Text className="text-sm text-blue-600" selectable>{submission.backendGithubUrl}</Text>
                        </View>
                    )}

                    {submission.deployedUrl && (
                        <View className="mb-3">
                            <Text className="text-xs font-semibold text-gray-500 mb-1">Deployed URL</Text>
                            <Text className="text-sm text-blue-600" selectable>{submission.deployedUrl}</Text>
                        </View>
                    )}

                    {submission.referenceFile && (
                        <View className="mb-3">
                            <Text className="text-xs font-semibold text-gray-500 mb-1">Reference File</Text>
                            <Text className="text-sm text-blue-600" selectable>{submission.referenceFile}</Text>
                        </View>
                    )}

                    {submission.note && (
                        <View className="mt-1">
                            <Text className="text-xs font-semibold text-gray-500 mb-1">Note</Text>
                            <Text className="text-sm text-gray-700">{submission.note}</Text>
                        </View>
                    )}
                </View>

                {/* Teacher Feedback - only show if feedback exists */}
                {hasFeedback ? (
                    <View className="mx-6 bg-blue-50 rounded-2xl p-4">
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-base font-semibold text-blue-900">Teacher Feedback</Text>
                            {submission.grade != null && (
                                <View className="bg-blue-100 px-3 py-1 rounded-full">
                                    <Text className="text-sm font-bold text-blue-700">{submission.grade}/100</Text>
                                </View>
                            )}
                        </View>
                        <Text className="text-sm text-blue-700">{submission.feedback}</Text>
                        {submission.reviewedAt && (
                            <Text className="text-xs text-blue-400 mt-2">{formatDate(submission.reviewedAt)}</Text>
                        )}
                    </View>
                ) : (
                    <View className="mx-6 bg-gray-50 rounded-2xl p-4 items-center">
                        <MaterialCommunityIcons name="message-text-clock-outline" size={28} color="#D1D5DB" />
                        <Text className="text-sm text-gray-400 mt-2">No feedback yet</Text>
                        <Text className="text-xs text-gray-300 mt-1">Teacher has not reviewed this submission</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default SubmissionDetails
