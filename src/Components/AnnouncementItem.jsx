import { View, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'

const AnnouncementItem = ({ item, onPress }) => {
    return (
        <Pressable
            className="mx-6 mb-3 bg-gray-50 rounded-2xl p-5 active:bg-gray-100"
            onPress={() => onPress?.(item)}
        >
            <View className="flex-row items-start mb-3">
                <View className="bg-blue-50 w-11 h-11 rounded-xl items-center justify-center mr-3">
                    <MaterialCommunityIcons name="bullhorn-outline" size={22} color="#2563EB" />
                </View>
                <View className="flex-1 justify-center">
                    <View className="flex-row justify-between">
                        <Text className="text-base font-bold text-gray-900 mb-1" numberOfLines={1}>
                            {item.title}
                        </Text>
                        <View className="flex-row items-center gap-1">
                            <MaterialCommunityIcons name="clock-outline" size={13} color="#9CA3AF" />
                            <Text className="text-xs text-gray-400">{moment(item.createdAt).fromNow()}</Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-3 justify-between">
                        {item.createdBy?.name && (
                            <View className="flex-row items-center gap-1">
                                <MaterialCommunityIcons name="account-outline" size={13} color="#6B7280" />
                                <Text className="text-xs text-gray-500">
                                    {item.createdBy.name}{item.createdBy.role ? ` (${item.createdBy.role})` : ''}
                                </Text>
                            </View>
                        )}
                        {item.domainId?.title && (
                            <View className="flex-row items-center gap-1">
                                <MaterialCommunityIcons name="tag-outline" size={13} color="#2563EB" />
                                <Text className="text-xs font-medium text-blue-600">{item.domainId.title}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            {/* Description */}
            <Text className="text-sm text-gray-500 leading-6 mb-4" numberOfLines={3}>
                {item.description}
            </Text>

            {/* Read More */}
            <View className="flex-row items-center justify-end pt-3 border-t border-gray-200">
                <Text className="text-sm font-semibold text-blue-600">Read More</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="#2563EB" />
            </View>
        </Pressable>
    )
}

export default AnnouncementItem
