import { View, Text } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const TAG_CONFIG = {
    'On Track': { bg: 'bg-green-50', text: 'text-green-600' },
    'Blockers Resolved': { bg: 'bg-blue-50', text: 'text-blue-600' },
    'Help Requested': { bg: 'bg-amber-50', text: 'text-amber-600' },
}

const ActivityLogItem = ({ item, isLast }) => {
    return (
        <View className="flex-row">
            <View className="items-center mr-3">
                <View className="w-3 h-3 rounded-full bg-blue-600 mt-1" />
                {!isLast && <View className="w-0.5 flex-1 bg-gray-200" />}
            </View>
            <View className="flex-1 pb-6">
                <Text className="text-xs text-gray-400 mb-1">{item.date}</Text>
                <Text className="text-sm font-semibold text-gray-900 mb-1">{item.title}</Text>
                <Text className="text-xs text-gray-400 mb-2">{item.description}</Text>
                <View className="flex-row items-center gap-2">
                    {item.tags?.map((tag) => {
                        const config = TAG_CONFIG[tag] || TAG_CONFIG['On Track']
                        return (
                            <View key={tag} className={`${config.bg} px-2 py-0.5 rounded-full`}>
                                <Text className={`text-xs ${config.text}`}>{tag}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export default ActivityLogItem
