import { View, Text, FlatList } from 'react-native'
import React from 'react'
import LeaderboardItem from '../../Components/LeaderboardItem'
import ScreenHeader from '../../Components/ScreenHeader'
import { LEADERBOARD, CURRENT_USER } from '../../data/dummyData'

const Leaderboard = ({ navigation }) => {
    return (
        <View className="flex-1 bg-white">
            <ScreenHeader title="Leaderboard" navigation={navigation} />
            <FlatList
                data={LEADERBOARD}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListHeaderComponent={
                    <Text className="text-sm text-gray-400 mb-4 text-center">
                        Rankings based on assignments and daily progress consistency
                    </Text>
                }
                renderItem={({ item }) => (
                    <LeaderboardItem
                        item={item}
                        isCurrentUser={item.name === CURRENT_USER.name}
                    />
                )}
            />
        </View>
    )
}

export default Leaderboard
