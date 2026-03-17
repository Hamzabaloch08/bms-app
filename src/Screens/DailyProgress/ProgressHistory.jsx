import { View, Text, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '../../Components/ScreenHeader'
import { getMyProgress } from '../../redux/Thunks/DailyProgressThunks'

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric'
    })
}

const ProgressHistory = ({ navigation }) => {
    const dispatch = useDispatch()
    const { progressList, loading } = useSelector(state => state.dailyProgress)

    useEffect(() => {
        dispatch(getMyProgress())
    }, [])

    if (loading) {
        return (
            <View className="flex-1 bg-white justify-center items-center">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <View className="bg-white rounded-2xl p-4 mb-3 mx-6" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}>
            {/* Header: Date + Hours */}
            <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-gray-100">
                <Text className="text-sm font-bold text-gray-900">{formatDate(item.createdAt)}</Text>
                <View className="bg-blue-50 px-3 py-1 rounded-full">
                    <Text className="text-xs text-blue-600 font-semibold">{item.hoursWorked} hrs worked</Text>
                </View>
            </View>

            {/* Today's Plan */}
            <View className="mb-2.5">
                <Text className="text-xs font-semibold text-gray-400 mb-1">{"TODAY'S PLAN"}</Text>
                <Text className="text-sm text-gray-700 leading-5">{item.todayPlan}</Text>
            </View>

            {/* Yesterday's Work */}
            <View className="mb-2.5">
                <Text className="text-xs font-semibold text-gray-400 mb-1">{"YESTERDAY'S WORK"}</Text>
                <Text className="text-sm text-gray-700 leading-5">{item.yesterdayWork}</Text>
            </View>

            {/* Blockers */}
            {item.blockers && item.blockers !== 'none' && (
                <View className="bg-amber-50 rounded-xl p-3 mb-2.5">
                    <Text className="text-xs font-semibold text-amber-600 mb-1">BLOCKERS</Text>
                    <Text className="text-sm text-amber-800 leading-5">{item.blockers}</Text>
                </View>
            )}

            {item.githubLink && (
                <View className="flex-row items-center gap-1.5 mb-2.5">
                    <MaterialCommunityIcons name="github" size={14} color="#6B7280" />
                    <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>{item.githubLink}</Text>
                </View>
            )}

            {item.feedback && (
                <View className="bg-green-50 rounded-xl p-3 mb-2.5">
                    <View className="flex-row items-center gap-1.5 mb-1">
                        <MaterialCommunityIcons name="message-reply-text-outline" size={14} color="#16A34A" />
                        <Text className="text-xs font-semibold text-green-600">MENTOR FEEDBACK</Text>
                    </View>
                    <Text className="text-sm text-green-800 leading-5">{item.feedback}</Text>
                </View>
            )}

            {item.isEditable ? (
                <Pressable
                    className="flex-row items-center justify-end gap-1 pt-3 border-t border-gray-100"
                    onPress={() => navigation.navigate('EditProgress', { progress: item })}
                >
                    <Text className="text-sm font-semibold text-blue-600">Edit</Text>
                    <MaterialCommunityIcons name="chevron-right" size={18} color="#2563EB" />
                </Pressable>
            ) : (
                <View className="flex-row items-center gap-1.5 pt-3 border-t border-gray-100">
                    <MaterialCommunityIcons name="lock-outline" size={13} color="#D1D5DB" />
                    <Text className="text-xs text-gray-400">Editing time has passed</Text>
                </View>
            )}
        </View>
    )

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title="Progress History" navigation={navigation} />
            <FlatList
                data={progressList}
                keyExtractor={(item, index) => item._id || String(index)}
                renderItem={renderItem}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="items-center justify-center py-20">
                        <MaterialCommunityIcons name="clipboard-text-off-outline" size={48} color="#D1D5DB" />
                        <Text className="text-base text-gray-400 mt-3">No progress submitted yet</Text>
                    </View>
                }
            />
        </View>
    )
}

export default ProgressHistory
