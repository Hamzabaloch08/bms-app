import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const CompletedAssignmentCard = ({ item, onPress }) => {
    const title = item.assignment?.title || 'Untitled Assignment'
    const description = item.assignment?.description || ''
    return (
        <Pressable
            className="bg-gray-50 rounded-2xl p-4 mb-3"
            onPress={() => onPress?.(item)}
        >
            <View className="flex-row items-center justify-between mb-1">
                <Text className="text-base font-bold text-gray-900 flex-1">{title}</Text>
                <View className="bg-green-50 px-2.5 py-1 rounded-full ml-2">
                    <Text className="text-xs font-medium text-green-600">Submitted</Text>
                </View>
            </View>
            <Text className="text-sm text-gray-400 mb-3" numberOfLines={2}>{description}</Text>

            <View className="flex-row items-center gap-4 mb-3">
                {item.assignment?.deadline && (
                    <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="clock-outline" size={14} color="#9CA3AF" />
                        <Text className="text-xs text-gray-400">Due: {formatDate(item.assignment.deadline)}</Text>
                    </View>
                )}
                <View className="flex-row items-center gap-1">
                    <MaterialCommunityIcons name="calendar-check-outline" size={14} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400">Submitted: {formatDate(item.createdAt)}</Text>
                </View>
            </View>

            <View className="flex-row items-center justify-end pt-3 border-t border-gray-200">
                <Text className="text-sm font-semibold text-blue-600">View Feedback</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#2563EB" />
            </View>
        </Pressable>
    )
}

export default CompletedAssignmentCard
