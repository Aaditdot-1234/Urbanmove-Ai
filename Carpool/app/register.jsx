import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import Navbar from './Components/navbar';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        username: '',
        city: '',
        gender: '',
        profilePicture: '',
    });

    const handlePublish = () => {
        console.log('Publishing ride:', formData);
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

                    <View className="flex-1 flex-row pt-24">
                        <View className="flex-1 px-4">
                            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                                <View className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 mb-8">
                                    <Text className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Register</Text>

                                    <View className="space-y-4 mb-6">
                                        <View>
                                            <Text className="text-white mb-2 ml-1">Username</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">📍</Text>
                                                <TextInput
                                                    placeholder="Username"
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.username}
                                                    onChangeText={(text) => setFormData({ ...formData, username: text })}
                                                />
                                            </View>
                                        </View>

                                        <View className="flex-row gap-4 mb-6">
                                            <View className='flex-1'>
                                                <Text className="text-white mb-2 ml-1">Email</Text>
                                                <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">📍</Text>
                                                    <TextInput
                                                        placeholder="Email"
                                                        placeholderTextColor="#94a3b8"
                                                        className="flex-1 text-white text-base outline-none"
                                                        value={formData.email}
                                                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                                                    />
                                                </View>
                                            </View>

                                            <View className="flex-1">
                                                <Text className="text-white mb-2 ml-1">Phone Number</Text>
                                                <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">📞</Text>
                                                    <TextInput
                                                        placeholder="Phone Number"
                                                        placeholderTextColor="#94a3b8"
                                                        className="flex-1 text-white text-base outline-none"
                                                        value={formData.phoneNumber}
                                                        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View className="flex-row gap-4 mb-6">
                                            <View className='flex-1'>
                                                <Text className="text-white mb-2 ml-1">City</Text>
                                                <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">📍</Text>
                                                    <TextInput
                                                        placeholder="City"
                                                        placeholderTextColor="#94a3b8"
                                                        className="flex-1 text-white text-base outline-none"
                                                        value={formData.city}
                                                        onChangeText={(text) => setFormData({ ...formData, city: text })}
                                                    />
                                                </View>
                                            </View>

                                            <View className="flex-1">
                                                <Text className="text-white mb-2 ml-1">profile picture</Text>
                                                <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">📸</Text>
                                                    <TextInput
                                                        placeholder="profile picture"
                                                        placeholderTextColor="#94a3b8"
                                                        className="flex-1 text-white text-base outline-none"
                                                        value={formData.profilePicture}
                                                        onChangeText={(text) => setFormData({ ...formData, profilePicture: text })}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                        <View>
                                            <Text className="text-white mb-2 ml-1">Password</Text>
                                            <View className="flex-row items-center bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">🏁</Text>
                                                <TextInput
                                                    placeholder="Password"
                                                    placeholderTextColor="#94a3b8"
                                                    className="flex-1 text-white text-base outline-none"
                                                    value={formData.password}
                                                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                    <View className="flex-col space-y-4 mb-6 justify-center">
                                        <Pressable
                                            onPress={handlePublish}
                                        >
                                            <LinearGradient
                                                colors={['#f97316', '#ea580c']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                className="py-4 rounded-xl items-center"
                                            >
                                                <Text className="text-white text-lg font-bold">Register</Text>
                                            </LinearGradient>
                                        </Pressable>

                                        <Text className="text-white text-lg font-bold text-center">or</Text>

                                        <Pressable
                                            onPress={handlePublish}
                                        >
                                            <LinearGradient
                                                colors={['#f97316', '#ea580c']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                className="py-4 rounded-xl items-center"
                                            >
                                                <Text className="text-white text-lg font-bold">Sign in using Google</Text>
                                            </LinearGradient>
                                        </Pressable>

                                        <Text className="text-white text-lg font-bold text-center">or</Text>

                                        <Pressable
                                            onPress={handlePublish}
                                        >
                                            <LinearGradient
                                                colors={['#f97316', '#ea580c']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                className="py-4 rounded-xl items-center"
                                            >
                                                <Text className="text-white text-lg font-bold">Sign in using Facebook</Text>
                                            </LinearGradient>
                                        </Pressable>
                                    </View>

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </PaperProvider>
    )
}

export default Register