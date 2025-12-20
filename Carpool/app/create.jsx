import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import Navbar from './Components/navbar';
import Sidebar from './Components/Sidebar';

const Create = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        date: '',
        time: '',
        carType: '',
        price: '',
        seats: ''
    });

    const handlePublish = () => {
        console.log('Publishing ride:', formData);
        // Add logic to submit form data
    };

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
                            <View className="flex-row items-center py-4">
                                <Pressable
                                    onPress={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-3 bg-slate-900/80 border border-white/10 rounded-xl hover:bg-white/5 mr-4"
                                >
                                    <Text className="text-white text-xl">☰</Text>
                                </Pressable>
                                <Text className="text-white text-2xl font-bold">Publish a Ride</Text>
                            </View>

                            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                                <View className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 mb-8">
                                    {/* Route Section */}
                                    <Text className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Route Details</Text>

                                    <View className="space-y-4 mb-6">
                                        <View>
                                            <Text className="text-white mb-2 ml-1">Source</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">📍</Text>
                                                <TextInput
                                                    placeholder="Leaving from..."
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.source}
                                                    onChangeText={(text) => setFormData({ ...formData, source: text })}
                                                />
                                            </View>
                                        </View>

                                        <View>
                                            <Text className="text-white mb-2 ml-1">Destination</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">🏁</Text>
                                                <TextInput
                                                    placeholder="Going to..."
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.destination}
                                                    onChangeText={(text) => setFormData({ ...formData, destination: text })}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {/* Schedule Section */}
                                    <Text className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Schedule</Text>

                                    <View className="flex-row gap-4 mb-6">
                                        <View className="flex-1">
                                            <Text className="text-white mb-2 ml-1">Date</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">📅</Text>
                                                <TextInput
                                                    placeholder="DD/MM/YYYY"
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.date}
                                                    onChangeText={(text) => setFormData({ ...formData, date: text })}
                                                />
                                            </View>
                                        </View>

                                        <View className="flex-1">
                                            <Text className="text-white mb-2 ml-1">Time</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">⏰</Text>
                                                <TextInput
                                                    placeholder="HH:MM"
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.time}
                                                    onChangeText={(text) => setFormData({ ...formData, time: text })}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    {/* Ride Details Section */}
                                    <Text className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Ride Details</Text>

                                    <View className="space-y-4 mb-8">
                                        <View>
                                            <Text className="text-white mb-2 ml-1">Car Type</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">🚗</Text>
                                                <TextInput
                                                    placeholder="e.g. Sedan, SUV..."
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.carType}
                                                    onChangeText={(text) => setFormData({ ...formData, carType: text })}
                                                />
                                            </View>
                                        </View>

                                        <View className="flex-row gap-4">
                                            <View className="flex-1">
                                                <Text className="text-white mb-2 ml-1">Price per Seat</Text>
                                                <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">💰</Text>
                                                    <TextInput
                                                        placeholder="0.00"
                                                        placeholderTextColor="#94a3b8"
                                                        keyboardType="numeric"
                                                        className="flex-1 text-white text-base outline-none"
                                                        value={formData.price}
                                                        onChangeText={(text) => setFormData({ ...formData, price: text })}
                                                    />
                                                </View>
                                            </View>

                                            <View className="flex-1">
                                                <Text className="text-white mb-2 ml-1">Available Seats</Text>
                                                <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">💺</Text>
                                                    <TextInput
                                                        placeholder="1-4"
                                                        placeholderTextColor="#94a3b8"
                                                        keyboardType="numeric"
                                                        className="flex-1 text-white text-base outline-none"
                                                        value={formData.seats}
                                                        onChangeText={(text) => setFormData({ ...formData, seats: text })}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                    <Pressable
                                        onPress={handlePublish}
                                    >
                                        <LinearGradient
                                            colors={['#f97316', '#ea580c']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            className="py-4 rounded-xl items-center"
                                        >
                                            <Text className="text-white text-lg font-bold">Publish Ride</Text>
                                        </LinearGradient>
                                    </Pressable>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </PaperProvider>
    )
}

export default Create