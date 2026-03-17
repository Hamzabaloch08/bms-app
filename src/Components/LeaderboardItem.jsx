import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getInitials } from '../data/dummyData'

const RANK_COLORS = {
    1: '#FFD700',
    2: '#C0C0C0',
    3: '#CD7F32',
}

const LeaderboardItem = ({ item, isCurrentUser }) => {
    const rankColor = RANK_COLORS[item.rank]

    return (
        <View className={`flex-row items-center py-3 px-4 rounded-xl mb-2 ${isCurrentUser ? 'bg-blue-50' : 'bg-white'}`}>
            <View className="w-8 items-center">
                {item.rank <= 3 ? (
                    <MaterialCommunityIcons name="trophy" size={20} color={rankColor} />
                ) : (
                    <Text className="text-sm font-bold text-gray-400">#{item.rank}</Text>
                )}
            </View>
            <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center mx-3">
                <Text className="text-sm font-bold text-gray-600">{getInitials(item.name)}</Text>
            </View>
            <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">{item.name}</Text>
            </View>
            <Text className="text-sm font-bold text-gray-700">{item.points} pts</Text>
        </View>
    )
}

export default LeaderboardItem
