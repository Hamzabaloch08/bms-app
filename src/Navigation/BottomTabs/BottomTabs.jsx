import { Pressable, Animated, Dimensions, Platform } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DashboardStack from './DashboardStack/DashboardStack'
import AnnouncementsStack from './AnnouncementsStack/AnnouncementsStack'
import AssignmentsStack from './AssignmentsStack/AssignmentsStack'
import ProgressStack from './ProgressStack/ProgressStack'
import ProfileStack from './ProfileStack/ProfileStack'

const Tab = createBottomTabNavigator()
const { width } = Dimensions.get('window')

const TAB_CONFIG = [
    { name: 'Dashboard', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Announcements', icon: 'bell-outline', activeIcon: 'bell' },
    { name: 'Assignments', icon: 'clipboard-text-outline', activeIcon: 'clipboard-text' },
    { name: 'Progress', icon: 'chart-line-variant', activeIcon: 'chart-line-variant' },
    { name: 'Profile', icon: 'account-outline', activeIcon: 'account' },
]

const TAB_BAR_MARGIN = Platform.OS === 'ios' ? 16 : 12
const TAB_BAR_WIDTH = width - TAB_BAR_MARGIN * 2
const TAB_COUNT = TAB_CONFIG.length
const PILL_WIDTH = TAB_BAR_WIDTH / TAB_COUNT
const PILL_PADDING = 6

const CustomTabBar = ({ state, navigation }) => {
    const insets = useSafeAreaInsets()
    const animatedValue = useRef(new Animated.Value(state.index)).current

    useEffect(() => {
        Animated.spring(animatedValue, {
            toValue: state.index,
            useNativeDriver: true,
            damping: 18,
            stiffness: 200,
            mass: 0.8,
        }).start()
    }, [state.index])

    const translateX = animatedValue.interpolate({
        inputRange: TAB_CONFIG.map((_, i) => i),
        outputRange: TAB_CONFIG.map((_, i) => i * PILL_WIDTH + PILL_PADDING),
    })

    return (
        <Animated.View
            style={{
                position: 'absolute',
                bottom: Math.max(insets.bottom, 10),
                left: TAB_BAR_MARGIN,
                right: TAB_BAR_MARGIN,
                height: Platform.OS === "ios" ? 64 : 60,
                backgroundColor: '#FFFFFF',
                borderRadius: 32,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 20,
            }}
        >
            {/* Animated Pill */}
            <Animated.View
                style={{
                    position: 'absolute',
                    width: PILL_WIDTH - PILL_PADDING * 2,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: '#2563EB',
                    transform: [{ translateX }],
                }}
            />

            {/* Tab Buttons */}
            {state.routes.map((route, index) => {
                const focused = state.index === index
                const tab = TAB_CONFIG[index]
                const iconName = focused ? tab.activeIcon : tab.icon

                return (
                    <Pressable
                        key={route.key}
                        onPress={() => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            })
                            if (!focused && !event.defaultPrevented) {
                                navigation.navigate(route.name)
                            }
                        }}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 64,
                        }}
                    >
                        <MaterialCommunityIcons
                            name={iconName}
                            size={24}
                            color={focused ? '#FFFFFF' : '#9CA3AF'}
                        />
                    </Pressable>
                )
            })}
        </Animated.View>
    )
}

const BottomTabs = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Dashboard" component={DashboardStack} />
            <Tab.Screen name="Announcements" component={AnnouncementsStack} />
            <Tab.Screen name="Assignments" component={AssignmentsStack} />
            <Tab.Screen name="Progress" component={ProgressStack} />
            <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
    )
}

export default BottomTabs
