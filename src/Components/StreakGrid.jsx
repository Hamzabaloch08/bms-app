import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const LEVEL_COLORS = ['#F3F4F6', '#BBF7D0', '#4ADE80', '#16A34A']
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const screenWidth = Dimensions.get('window').width
const GAP = 4
const PADDING = 48
const CELL_SIZE = Math.floor((screenWidth - PADDING - 6 * GAP) / 7)

const StreakGrid = ({ data }) => {
    return (
        <View>
            <View className="flex-row mb-1" style={{ gap: GAP }}>
                {DAYS.map((day, i) => (
                    <View key={i} style={{ width: CELL_SIZE }} className="items-center">
                        <Text className="text-xs text-gray-400">{day}</Text>
                    </View>
                ))}
            </View>
            {data.map((week, wi) => (
                <View key={wi} className="flex-row mb-1" style={{ gap: GAP }}>
                    {week.map((level, di) => (
                        <View
                            key={di}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                backgroundColor: LEVEL_COLORS[level],
                                borderRadius: 4,
                            }}
                        />
                    ))}
                </View>
            ))}
            <View className="flex-row items-center justify-end mt-2 gap-1">
                <Text className="text-xs text-gray-400 mr-1">Less</Text>
                {LEVEL_COLORS.map((color, i) => (
                    <View key={i} style={{ width: 12, height: 12, backgroundColor: color, borderRadius: 2 }} />
                ))}
                <Text className="text-xs text-gray-400 ml-1">More</Text>
            </View>
        </View>
    )
}

export default StreakGrid
