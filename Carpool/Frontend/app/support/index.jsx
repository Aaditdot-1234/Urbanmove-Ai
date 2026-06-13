import Navbar from '@/components/created/navbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Support = () => {
    const helpTopics = [
        {
            title: "Getting Started",
            description: "Articles to get you up and running, quick and easy.",
            icon: "rocket-launch-outline"
        },
        {
            title: "My Account",
            description: "How to manage your account and its features.",
            icon: "account-cog-outline"
        },
        {
            title: "Billing & Payments",
            description: "Information about how we charge you for our services.",
            icon: "credit-card-outline"
        },
        {
            title: "Mobile App",
            description: "Documentation and troubleshooting our mobile app.",
            icon: "cellphone"
        },
        {
            title: "Copyright & Legal",
            description: "Important information about how we handle your privacy and data.",
            icon: "scale-balance"
        },
        {
            title: "Developers",
            description: "Developer documentation and integration features.",
            icon: "code-tags"
        }
    ];

    const popularArticles = [
        "How Does the 14 Day Free Trial Work?",
        "How to Create an Account",
        "How Our Pricing Plans Work",
        "How Can I Edit My Already Existing Page?",
        "How Do I See My Published Page?"
    ];

    return (
        <PaperProvider>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={['#0f172a', '#1e1b4b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1"
            >
                <SafeAreaView className="flex-1">
                    <Navbar />
                    <ScrollView className="flex-1 pt-20 px-4" showsVerticalScrollIndicator={false}>

                        {/* Header Section */}
                        <View className="items-center mb-10 mt-4">
                            <Text className="text-slate-400 text-lg font-medium mb-2">Support</Text>
                            <Text className="text-3xl font-bold text-white mb-6">How can we help?</Text>

                            {/* Search Bar */}
                            <View className="flex-row items-center bg-white/10 rounded-full px-4 py-3 w-full border border-white/10">
                                <MaterialCommunityIcons name="magnify" size={24} color="#94a3b8" />
                                <TextInput
                                    placeholder="Search the Knowledge Base"
                                    placeholderTextColor="#94a3b8"
                                    className="flex-1 ml-3 text-white text-base"
                                    underlineColorAndroid="transparent"
                                    style={{ outlineStyle: "none" }}
                                />
                            </View>
                        </View>

                        <View className="flex-col lg:flex-row gap-8">
                            {/* Help Topics Grid */}
                            <View className="flex-1">
                                <Text className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Help Topics</Text>
                                <View className="flex-row flex-wrap justify-between">
                                    {helpTopics.map((topic, index) => (
                                        <View key={index} className="w-[48%] mb-6">
                                            <TouchableOpacity className="items-start">
                                                <View className="mb-3">
                                                    <MaterialCommunityIcons name={topic.icon} size={32} color="#f97316" />
                                                </View>
                                                <Text className="text-white font-bold text-lg mb-2">{topic.title}</Text>
                                                <Text className="text-slate-400 text-sm leading-5">{topic.description}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {/* Sidebar / Right Column */}
                            <View className="w-full lg:w-1/3 mt-8 lg:mt-0">
                                {/* Popular Articles */}
                                <View className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-white/5">
                                    <Text className="text-white font-bold text-lg mb-4">Popular Articles</Text>
                                    {popularArticles.map((article, index) => (
                                        <TouchableOpacity key={index} className="mb-3">
                                            <Text className="text-slate-300 text-sm hover:text-[#f97316]">{article}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Need Support Card */}
                                <View className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                                    <Text className="text-white font-bold text-lg mb-2">Need Support?</Text>
                                    <Text className="text-slate-400 text-sm mb-4">
                                        Can't find the answer you're looking for? Don't worry we're here to help!
                                    </Text>
                                    <TouchableOpacity className="bg-[#f97316] py-3 rounded-full items-center">
                                        <Text className="text-white font-bold">CONTACT SUPPORT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className="h-20" />
                    </ScrollView>
                </SafeAreaView>
            </LinearGradient>
        </PaperProvider>
    )
}

export default Support