import { View, Text, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenHeader = ({ title, navigation, onBack, rightComponent }) => {
    const insets = useSafeAreaInsets()

    return (
        <View
            className="flex-row items-center px-4 pb-3 bg-white border-b border-gray-100"
            style={{ paddingTop: insets.top + 6 }}
        >
            <Pressable
                className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
                onPress={() => onBack ? onBack() : navigation.goBack()}
            >
                <MaterialCommunityIcons name="arrow-left" size={20} color="#374151" />
            </Pressable>
            <Text className="flex-1 text-base font-bold text-gray-900 ml-3" numberOfLines={1}>{title}</Text>
            {rightComponent || null}
        </View>
    )
}

export default ScreenHeader
