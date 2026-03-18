import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import ScreenHeader from '../../Components/ScreenHeader'
import { getNotifications, markAllNotificationsRead, markSingleNotificationRead } from '../../redux/Thunks/NotificationThunks'
import moment from 'moment'

const TYPE_CONFIG = {
    announcement: { icon: 'bullhorn-outline', color: '#2563EB', bg: '#EFF6FF' },
    feedback: { icon: 'star-outline', color: '#F59E0B', bg: '#FFFBEB' },
    submission: { icon: 'file-send-outline', color: '#16A34A', bg: '#F0FDF4' },
    system: { icon: 'information-outline', color: '#6B7280', bg: '#F9FAFB' },
}

const NotificationItem = ({ item, onPress }) => {
    const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.system

    return (
        <Pressable
            className={`flex-row px-5 py-4 ${item.unread ? 'bg-blue-50/50' : ''}`}
            style={{ borderBottomWidth: 1, borderBottomColor: '#F3F4F6' }}
            onPress={() => onPress(item)}
        >
            <View
                style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    backgroundColor: config.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                }}
            >
                <MaterialCommunityIcons name={config.icon} size={20} color={config.color} />
            </View>
            <View className="flex-1">
                <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-semibold text-gray-900 flex-1 mr-2">{item.title}</Text>
                    {item.unread && <View className="w-2 h-2 rounded-full bg-blue-600" />}
                </View>
                <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>{item.message}</Text>
                {item.grade && <Text className="text-xs text-amber-600 font-medium mt-1">Score: {item.grade}</Text>}
                <Text className="text-xs text-gray-400 mt-1.5">{moment(item.time).fromNow()}</Text>
            </View>
        </Pressable>
    )
}

const NotificationsScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { notifications, loading, unreadCount, pagination } = useSelector(state => state.notifications)

    useEffect(() => {
        dispatch(getNotifications({ page: 1 }))
    }, [dispatch])

    const handlePress = (item) => {
        if (item.unread) {
            dispatch(markSingleNotificationRead(item.id))
        }
    }

    const markAllRead = () => {
        dispatch(markAllNotificationsRead())
    }

    const loadMore = () => {
        if (!loading && pagination && pagination.currentPage < pagination.totalPages) {
            dispatch(getNotifications({ page: pagination.currentPage + 1 }))
        }
    }

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader
                title="Notifications"
                navigation={navigation}
                rightComponent={
                    unreadCount > 0 ? (
                        <Pressable onPress={markAllRead}>
                            <Text className="text-xs text-blue-600 font-medium">Mark all read</Text>
                        </Pressable>
                    ) : null
                }
            />
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <NotificationItem item={item} onPress={handlePress} />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
                ListFooterComponent={loading && notifications.length > 0 ? (
                    <View className="py-4">
                        <ActivityIndicator size="small" color="#2563EB" />
                    </View>
                ) : null}
                ListEmptyComponent={
                    loading ? (
                        <View className="items-center justify-center py-20">
                            <ActivityIndicator size="large" color="#2563EB" />
                        </View>
                    ) : (
                        <View className="items-center justify-center py-20">
                            <MaterialCommunityIcons name="bell-check-outline" size={48} color="#D1D5DB" />
                            <Text className="text-sm text-gray-400 mt-3">No notifications</Text>
                        </View>
                    )
                }
            />
        </View>
    )
}

export default NotificationsScreen
