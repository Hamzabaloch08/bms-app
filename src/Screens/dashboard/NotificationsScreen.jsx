import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '../../Components/ScreenHeader'
import { NOTIFICATIONS } from '../../data/dummyData'

const TYPE_CONFIG = {
    grade: { icon: 'star-outline', color: '#F59E0B', bg: '#FFFBEB' },
    reminder: { icon: 'clock-alert-outline', color: '#EF4444', bg: '#FEF2F2' },
    mentor: { icon: 'message-reply-text-outline', color: '#2563EB', bg: '#EFF6FF' },
    streak: { icon: 'fire', color: '#F97316', bg: '#FFF7ED' },
    system: { icon: 'information-outline', color: '#6B7280', bg: '#F9FAFB' },
}

const NotificationItem = ({ item, onPress }) => {
    const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.system

    return (
        <Pressable
            className={`flex-row px-5 py-4 ${!item.isRead ? 'bg-blue-50/50' : ''}`}
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
                    {!item.isRead && <View className="w-2 h-2 rounded-full bg-blue-600" />}
                </View>
                <Text className="text-xs text-gray-500 mt-1" numberOfLines={2}>{item.message}</Text>
                <Text className="text-xs text-gray-400 mt-1.5">{item.time}</Text>
            </View>
        </Pressable>
    )
}

const NotificationsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(NOTIFICATIONS)
    const unreadCount = notifications.filter(n => !n.isRead).length

    const handlePress = (item) => {
        setNotifications(prev =>
            prev.map(n => n.id === item.id ? { ...n, isRead: true } : n)
        )
    }

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
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
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <MaterialCommunityIcons name="bell-check-outline" size={48} color="#D1D5DB" />
                        <Text className="text-sm text-gray-400 mt-3">No notifications</Text>
                    </View>
                }
            />
        </View>
    )
}

export default NotificationsScreen
