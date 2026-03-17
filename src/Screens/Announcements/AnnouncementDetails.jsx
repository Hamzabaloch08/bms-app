import { View, Text, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ScreenHeader from '../../Components/ScreenHeader'

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    })
}

const AnnouncementDetails = ({ route, navigation }) => {
    const { announcement } = route.params

    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title="Announcement" navigation={navigation} />
            <ScrollView
                className="flex-1 px-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                <View className="flex-row items-center justify-between mt-4 mb-4">
                    {announcement.domainId?.title && (
                        <View className="bg-blue-50 px-3 py-1.5 rounded-full">
                            <Text className="text-xs font-semibold text-blue-600">{announcement.domainId.title}</Text>
                        </View>
                    )}
                    <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="clock-outline" size={13} color="#9CA3AF" />
                        <Text className="text-xs text-gray-400">{formatDate(announcement.createdAt)}</Text>
                    </View>
                </View>
                <Text className="text-xl font-bold text-gray-900 mb-4">{announcement.title}</Text>
                {announcement.createdBy?.name && (
                    <View className="flex-row items-center gap-1.5 mb-4">
                        <MaterialCommunityIcons name="account-outline" size={16} color="#6B7280" />
                        <Text className="text-sm text-gray-500">
                            By {announcement.createdBy.name}{announcement.createdBy.role ? ` (${announcement.createdBy.role})` : ''}
                        </Text>
                    </View>
                )}
                <Text className="text-sm text-gray-600 leading-6">{announcement.description}</Text>
            </ScrollView>
        </View>
    )
}

export default AnnouncementDetails
