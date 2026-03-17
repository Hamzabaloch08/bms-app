import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

const getOverdueDays = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffMs = now - deadlineDate
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    if (diffDays <= 0) return null
    return diffDays
}

const OverdueAssignmentCard = ({ item, onPress }) => {
    const overdueDays = getOverdueDays(item.deadline)

    return (
        <Pressable
            className="bg-red-50 rounded-2xl p-4 mb-3 border border-red-100"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}
            onPress={() => onPress?.(item)}
        >
            <View className="flex-row items-center justify-between mb-1">
                <Text className="text-base font-bold text-gray-900 flex-1">{item.title}</Text>
                <View className="bg-red-100 px-2.5 py-1 rounded-full ml-2">
                    <Text className="text-xs font-medium text-red-600">
                        {overdueDays} {overdueDays === 1 ? 'day' : 'days'} overdue
                    </Text>
                </View>
            </View>
            <Text className="text-sm text-gray-400 mb-4" numberOfLines={2}>{item.description}</Text>

            <View className="flex-row items-center gap-4 mb-3">
                <View className="flex-row items-center gap-1">
                    <MaterialCommunityIcons name="clock-alert-outline" size={14} color="#EF4444" />
                    <Text className="text-xs text-red-500">Due: {formatDeadline(item.deadline)}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                    <MaterialCommunityIcons name="account-outline" size={14} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400">
                        {item.teacher?.name}{item.teacher?.role ? ` (${item.teacher.role})` : ' (Teacher)'}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center justify-end pt-3 border-t border-red-200">
                <Text className="text-sm font-semibold text-red-600">Submit Now</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#EF4444" />
            </View>
        </Pressable>
    )
}

export default OverdueAssignmentCard
