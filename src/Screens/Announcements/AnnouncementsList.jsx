import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import AnnouncementItem from '../../Components/AnnouncementItem'
import { getAnnouncements } from '../../redux/Thunks/AnnouncementThunks'

const CACHE_DURATION = 30 * 1000 // 30 seconds

const AnnouncementsList = ({ navigation }) => {
    const dispatch = useDispatch()
    const { announcements, loading, lastFetchedAt } = useSelector(state => state.announcements)

    useFocusEffect(
        useCallback(() => {
            const isStale = !lastFetchedAt || (Date.now() - lastFetchedAt) > CACHE_DURATION
            if (isStale) {
                let res =dispatch(getAnnouncements()).unwrap();
                console.log("ghfgyfk",res.data)

            }
        }, [lastFetchedAt, dispatch])
    )

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="px-6 pt-2 pb-4">
                <Text className="text-2xl font-bold text-gray-900">Announcements</Text>
            </View>
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#1D4ED8" />
                </View>
            ) : (
                <FlatList
                    data={announcements}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100, paddingTop:10, }}
                    renderItem={({ item }) => (
                        <AnnouncementItem
                            item={item}
                            onPress={() => navigation.navigate('AnnouncementDetails', { announcement: item })}
                        />
                    )}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20">
                            <MaterialCommunityIcons name="bullhorn-outline" size={48} color="#D1D5DB" />
                            <Text className="text-base text-gray-400 mt-3">No announcements yet</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default AnnouncementsList
