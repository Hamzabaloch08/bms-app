import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const AssignmentCard = ({ item, onPress }) => {
    return (
        <Pressable
            className="bg-white rounded-2xl p-4 mb-3"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}
            onPress={() => onPress?.(item)}
        >
            <Text className="text-base font-bold text-gray-900 mb-1">{item.title}</Text>
            <Text className="text-sm text-gray-400 mb-4" numberOfLines={2}>{item.description}</Text>

            <View className="flex-row items-center gap-4 mb-3">
                <View className="flex-row items-center gap-1">
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400">{formatDeadline(item.deadline)}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <MaterialCommunityIcons name="account-outline" size={14} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400">
                        {item.teacher?.name}{item.teacher?.role ? ` (${item.teacher.role})` : ' (Teacher)'}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center justify-end pt-3 border-t border-gray-200">
                <Text className="text-sm font-semibold text-blue-600">Submit Assignment</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#2563EB" />
            </View>
        </Pressable>
    )
}

export default AssignmentCard
