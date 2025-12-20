import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import RideList from './Components/RideList';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/navbar';

const Ride = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <PaperProvider>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#0f172a', '#1e1b4b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <View className="flex-1">
                    <Navbar />

                    <View className="flex-1 flex-row pt-16">

                        {isSidebarOpen && (
                            <View className="h-full z-40">
                                <Sidebar />
                            </View>
                        )}

                        <View className="flex-1 px-4">
                            <View className="flex-row items-center justify-between py-4">
                                <View className="flex-1 flex-row items-center gap-4 max-w-2xl">
                                    <Pressable
                                        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="p-3 bg-slate-900/80 border border-white/10 rounded-xl hover:bg-white/5"
                                    >
                                        <Text className="text-white text-xl">☰</Text>
                                    </Pressable>

                                    <View className="flex-1 flex-row items-center bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3">
                                        <Text className="text-slate-400 mr-3">🔍</Text>
                                        <TextInput
                                            placeholder="Search ride..."
                                            placeholderTextColor="#94a3b8"
                                            className="flex-1 text-white text-base outline-none"
                                        />
                                    </View>
                                </View>

                                <View className="flex-row items-center gap-3 ml-4">
                                    <Pressable className="flex-row items-center gap-2 bg-slate-900/80 border border-white/10 px-4 py-3 rounded-xl hover:bg-white/5">
                                        <Text className="text-slate-400">⚡</Text>
                                        <Text className="text-white font-medium">Filters</Text>
                                    </Pressable>

                                    <Pressable>
                                        <LinearGradient
                                            colors={['#f97316', '#ea580c']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            className="flex-row items-center gap-2 px-5 py-3 rounded-xl"
                                        >
                                            <Text className="text-white text-lg font-medium">+</Text>
                                            <Link href="/create">
                                                <Text className="text-white font-bold">New Ride</Text>
                                            </Link>
                                        </LinearGradient>
                                    </Pressable>
                                </View>
                            </View>

                            <RideList />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </PaperProvider>
    )
}

export default Ride