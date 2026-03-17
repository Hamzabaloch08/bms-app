import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const StatsCard = ({ iconName, iconColor, iconBgColor, label, value }) => {
    return (
        <View className={`flex-1 bg-white rounded-2xl p-4 border border-gray-100`}>
            <View className={`${iconBgColor} w-10 h-10 rounded-full items-center justify-center mb-2`}>
                <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
            </View>
            <Text className="text-xs text-gray-400">{label}</Text>
            <Text className="text-lg font-bold text-gray-900">{value}</Text>
        </View>
    )
}

export default StatsCard
