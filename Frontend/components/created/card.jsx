import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Card = ({ title, para, link, iconName = "car-sports" }) => {
    return (
        <LinearGradient
            colors={['rgba(30, 41, 59, 0.8)', 'rgba(15, 23, 42, 0.9)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className='flex justify-between items-start rounded-3xl w-[85%] border border-white/10 p-6 mb-6 shadow-2xl'
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 }}
        >
            <View className="mb-4">
                <View className="flex-row items-center mb-3">
                    <View className="bg-orange-500/20 p-2 rounded-lg mr-3">
                        <MaterialCommunityIcons name={iconName} size={24} color="#f97316" />
                    </View>
                    <Text className='text-white text-xl font-bold tracking-wide'>{title}</Text>
                </View>
                <Text className='text-slate-300 text-sm leading-6 font-medium'>{para}</Text>
            </View>

            <Link href={link} asChild>
                <Pressable className="w-full mt-4 shadow-lg shadow-orange-500/20">
                    <LinearGradient
                        colors={["#f97316", "#c2410c"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="py-3.5 rounded-xl items-center justify-center"
                    >
                        <Text className="text-white text-base font-bold tracking-wide uppercase">Take a ride</Text>
                    </LinearGradient>
                </Pressable>
            </Link>
        </LinearGradient>
    )
}

export default Card