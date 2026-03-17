import { View, Text, ScrollView, Pressable, Platform, Image } from 'react-native'
import { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssignments } from '../../redux/Thunks/AssignmentThunks'
import { getAnnouncements } from '../../redux/Thunks/AnnouncementThunks'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'

// Stats Card
const StatCard = ({ icon, iconColor, iconBg, label, value, subValue }) => (
    <View
        className="flex-1 bg-white rounded-2xl p-4 border border-gray-100"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
    >
        <View className="flex-row items-center mb-3">
            <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: iconBg }}
            >
                <MaterialCommunityIcons name={icon} size={18} color={iconColor} />
            </View>
        </View>
        <Text className="text-xs text-gray-400 mb-0.5">{label}</Text>
        <View className="flex-row items-baseline">
            <Text className="text-xl font-bold text-gray-900">{value}</Text>
            {subValue && <Text className="text-xs text-gray-400 ml-1">{subValue}</Text>}
        </View>
    </View>
)

// Simple announcement item
const DashboardAnnouncementItem = ({ item, onPress }) => (
    <Pressable
        className="flex-row items-center py-3 active:bg-gray-50"
        onPress={onPress}
    >
        <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>
                {item.title}
            </Text>
            <Text className="text-xs text-gray-400 mt-0.5">
                {moment(item.createdAt).fromNow()}
            </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={18} color="#D1D5DB" />
    </Pressable>
)

// Assignment row for "Up Next" section
const UpNextAssignmentItem = ({ item, onPress }) => {
    const getAssignmentIcon = (title) => {
        const t = title?.toLowerCase() || ''
        if (t.includes('api') || t.includes('node') || t.includes('backend')) return 'nodejs'
        if (t.includes('database') || t.includes('sql')) return 'database-outline'
        if (t.includes('react') || t.includes('dashboard')) return 'react'
        if (t.includes('html') || t.includes('css') || t.includes('portfolio')) return 'language-html5'
        return 'file-document-outline'
    }

    const getIconBgColor = (title) => {
        const t = title?.toLowerCase() || ''
        if (t.includes('api') || t.includes('node') || t.includes('backend')) return '#F0FDF4'
        if (t.includes('database') || t.includes('sql')) return '#FFF7ED'
        return '#EFF6FF'
    }

    const getIconColor = (title) => {
        const t = title?.toLowerCase() || ''
        if (t.includes('api') || t.includes('node') || t.includes('backend')) return '#16A34A'
        if (t.includes('database') || t.includes('sql')) return '#EA580C'
        return '#2563EB'
    }

    return (
        <Pressable
            className="flex-row items-center py-3.5 border-b border-gray-100 active:bg-gray-50"
            onPress={onPress}
        >
            <View
                className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: getIconBgColor(item.title) }}
            >
                <MaterialCommunityIcons
                    name={getAssignmentIcon(item.title)}
                    size={20}
                    color={getIconColor(item.title)}
                />
            </View>
            <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900" numberOfLines={1}>{item.title}</Text>
                <Text className="text-xs text-gray-400 mt-0.5" numberOfLines={1}>
                    {item.description || item.teacher?.name || 'Assignment'}
                </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={18} color="#D1D5DB" style={{ marginLeft: 8 }} />
        </Pressable>
    )
}

const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { assignmentList } = useSelector(state => state.assignments)
    const { announcements } = useSelector(state => state.announcements)

    useEffect(() => {
        dispatch(getAllAssignments())
        dispatch(getAnnouncements())
    }, [dispatch])

    const pendingAssignments = assignmentList.filter(a => !a.isSubmit)
    const completedAssignments = assignmentList.filter(a => a.isSubmit)
    const recentAnnouncements = (announcements || []).slice(0, 3)

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />

            {/* Header: Left = PFP + User details, Right = Notification */}
            <View className="bg-white px-5 pb-4 border-b border-gray-100" style={{ paddingTop: Platform.OS === 'ios' ? 56 : 40 }}>
                <View className="flex-row items-center justify-between">
                    {/* Left: Avatar + User Info */}
                    <View className="flex-row items-center">
                            {user?.profileImage ? <Image src={user?.profileImage} /> : ""}
                        <View>
                            <Text className="text-base font-bold text-gray-900">{user?.name || 'Student'}</Text>
                            <Text className="text-xs text-gray-400">Student ID: #{user?._id || '0000'}</Text>
                        </View>
                    </View>

                    {/* Right: Notification Bell */}
                    <Pressable
                        className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center"
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <MaterialCommunityIcons name="bell-outline" size={22} color="#374151" />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 140 }}
            >
                {/* Welcome Section */}
                <View className="px-5 pt-5 pb-2">
                    <Text className="text-2xl font-bold text-gray-900">
                        Welcome back, {user?.name}!
                    </Text>
                    <Text className="text-sm text-gray-400 mt-1">
                        {"Here's a quick look at your bootcamp status."}
                    </Text>
                </View>

                {/* Stats Cards Row - Completed + Pending */}
                <View className="flex-row px-5 mt-4 gap-3">
                    <StatCard
                        icon="check-circle-outline"
                        iconColor="#16A34A"
                        iconBg="#F0FDF4"
                        label="Completed"
                        value={completedAssignments.length}
                    />
                    <StatCard
                        icon="clipboard-text-outline"
                        iconColor="#F59E0B"
                        iconBg="#FFFBEB"
                        label="Pending Assignments"
                        value={pendingAssignments.length}
                    />
                </View>

                {/* Daily Standup CTA */}
                <Pressable
                    className="mx-5 mt-5 rounded-2xl overflow-hidden active:opacity-90"
                    onPress={() => navigation.getParent().navigate('Progress')}
                >
                    <LinearGradient
                        colors={['#2563EB', '#3B82F6', '#60A5FA']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 16, padding: 24 }}
                    >
                        <View className="flex-row items-center">
                            <View className="flex-1 pr-4">
                                <Text className="text-lg font-bold text-white mb-2">
                                    Submit Today's Daily Standup
                                </Text>
                                <Text className="text-sm text-blue-100 mb-5 leading-5">
                                    Keep your mentors updated on your daily progress, goals, and any blockers you might be facing.
                                </Text>
                                <View className="bg-white self-start rounded-lg px-5 py-2.5">
                                    <Text className="text-sm font-bold text-blue-600">Submit Now</Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name="rocket-launch-outline" size={52} color="rgba(255,255,255,0.25)" />
                        </View>
                    </LinearGradient>
                </Pressable>

                {/* Announcements Section - Simple */}
                <View className="mx-5 mt-6">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-base font-bold text-gray-900">Announcements</Text>
                        <Pressable onPress={() => navigation.getParent().navigate('Announcements')}>
                            <Text className="text-xs text-blue-600 font-semibold">View All</Text>
                        </Pressable>
                    </View>
                    <View
                        className="bg-white rounded-2xl px-4 overflow-hidden"
                        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}
                    >
                        {recentAnnouncements.length === 0 ? (
                            <View className="py-6 items-center">
                                <MaterialCommunityIcons name="bullhorn-outline" size={28} color="#D1D5DB" />
                                <Text className="text-sm text-gray-400 mt-2">No announcements yet</Text>
                            </View>
                        ) : (
                            recentAnnouncements.map((item, index) => (
                                <View key={item._id || item.id || index}>
                                    <DashboardAnnouncementItem
                                        item={item}
                                        onPress={() => navigation.getParent().navigate('Announcements', { screen: 'AnnouncementsList', params: { announcement: item } })}
                                    />
                                    {index < recentAnnouncements.length - 1 && (
                                        <View className="h-px bg-gray-100" />
                                    )}
                                </View>
                            ))
                        )}
                    </View>
                </View>

                {/* Up Next: Assignments */}
                <View className="mx-5 mt-6">
                    <View className="flex-row items-center justify-between mb-3">
                        <Text className="text-base font-bold text-gray-900">Up Next: Assignments</Text>
                        <Pressable onPress={() => navigation.getParent().navigate('Assignments', {
                            screen: 'AnnouncementsList',
                        })}>
                            <Text className="text-xs text-blue-600 font-semibold">View All</Text>
                        </Pressable>
                    </View>
                    <View
                        className="bg-white rounded-2xl px-4 overflow-hidden"
                        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1 }}
                    >
                        {pendingAssignments.length === 0 ? (
                            <View className="py-6 items-center">
                                <MaterialCommunityIcons name="check-circle-outline" size={28} color="#D1D5DB" />
                                <Text className="text-sm text-gray-400 mt-2">All caught up!</Text>
                            </View>
                        ) : (
                            pendingAssignments.slice(0, 4).map((item, index) => (
                                <UpNextAssignmentItem
                                    key={item._id || index}
                                    item={item}
                                    onPress={() => navigation.getParent().navigate('Assignments', {
                                        screen: 'AnnouncementsList',
                                    })}
                                />
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Dashboard
