import RideList from "@/components/created/RideList";
import Sidebar from "@/components/created/Sidebar";
import Navbar from "@/components/created/navbar";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const Ride = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <StatusBar style="light" />
            <LinearGradient
                colors={["#080d1a", "#0f0e2d"]}
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
                            <View className="flex-col items-center justify-between py-4 gap-4">
                                <View className="w-full flex-row items-center justify-between">
                                    <Pressable
                                        onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className="p-3 bg-slate-900/80 border border-white/10 rounded-xl"
                                    >
                                        <Text className="text-white text-xl">☰</Text>
                                    </Pressable>

                                    <Link href="/create" asChild>
                                        <Pressable className="shadow-lg shadow-orange-900/30">
                                            <LinearGradient
                                                colors={["#f97316", "#c2410c"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                className="flex-row items-center gap-2 px-5 py-3 rounded-xl"
                                            >
                                                <Text className="text-white font-bold">+ New Ride</Text>
                                            </LinearGradient>
                                        </Pressable>
                                    </Link>
                                </View>

                                <View className="w-full flex-row items-center justify-between gap-3">
                                    <View className="flex-1 flex-row items-center bg-slate-900/80 border border-white/10 rounded-xl px-4 py-3">
                                        <Text className="text-slate-400 mr-3">🔍</Text>
                                        <TextInput
                                            placeholder="Search ride..."
                                            placeholderTextColor="#64748b"
                                            className="flex-1 text-white text-base outline-none"
                                        />
                                    </View>

                                    <Pressable className="flex-row items-center gap-2 bg-slate-900/80 border border-white/10 px-4 py-3 rounded-xl">
                                        <Text className="text-slate-400">⚡</Text>
                                        <Text className="text-slate-300 font-medium text-sm">Filters</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <RideList />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </>
    );
};

export default Ride;
