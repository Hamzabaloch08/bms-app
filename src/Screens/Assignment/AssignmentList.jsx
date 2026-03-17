import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AssignmentCard from '../../Components/AssignmentCard'
import CompletedAssignmentCard from '../../Components/CompletedAssignmentCard'
import OverdueAssignmentCard from '../../Components/OverdueAssignmentCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAssignments, getCompletedAssignments } from '../../redux/Thunks/AssignmentThunks'

const TABS = [
    { key: 'completed', label: 'Completed' },
    { key: 'pending', label: 'Pending' },
]

const AssignmentList = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('pending')

    const dispatch = useDispatch()
    const { assignmentList, completedList, loading } = useSelector(state => state.assignments)

    useEffect(() => {
        if (activeTab === 'pending') {
            dispatch(getAllAssignments())
        } else if (activeTab === 'completed') {
            dispatch(getCompletedAssignments())
        }
    }, [activeTab])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar style="dark" />
            <View className="px-6 pt-2 pb-4">
                <Text className="text-2xl font-bold text-gray-900">Assignments</Text>
            </View>
            <View className="flex-row bg-gray-100 rounded-xl p-1 mx-6 mb-4">
                {TABS.map((tab) => (
                    <Pressable
                        key={tab.key}
                        className={`flex-1 py-2.5 rounded-lg items-center ${activeTab === tab.key ? 'bg-white' : ''}`}
                        onPress={() => setActiveTab(tab.key)}
                    >
                        <Text className={`text-sm ${activeTab === tab.key ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
                            {tab.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#2563EB" />
                </View>
            ) : (
                <FlatList
                    data={activeTab === 'completed' ? completedList : assignmentList.filter(item => !item.isSubmit)}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 5, }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        activeTab === 'completed' ? (
                            <CompletedAssignmentCard
                                item={item}
                                onPress={() => navigation.navigate('SubmissionDetails', { submission: item })}
                            />
                        ) : (
                            <AssignmentCard
                                item={item}
                                onPress={() => navigation.navigate('AssignmentDetails', { assignment: item })}
                            />
                        )
                    )}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-20">
                            <MaterialCommunityIcons name="clipboard-text-off-outline" size={48} color="#D1D5DB" />
                            <Text className="text-base text-gray-400 mt-3">No assignments here</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default AssignmentList