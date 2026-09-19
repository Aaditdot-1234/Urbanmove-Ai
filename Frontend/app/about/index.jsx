import Navbar from '@/components/created/navbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = () => {
  const features = [
    {
      title: "Cost Effective",
      description: "Split costs with fellow riders and save money on your daily commute.",
      icon: "cash-multiple"
    },
    {
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint by sharing rides and decreasing traffic.",
      icon: "leaf"
    },
    {
      title: "Community",
      description: "Connect with verified professionals and build your network.",
      icon: "account-group"
    },
    {
      title: "Secure & Reliable",
      description: "Verified users and secure platform for a safe journey every time.",
      icon: "shield-check"
    }
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
            {/* Hero Section */}
            <View className="mb-8 mt-4">
              <Text className="text-3xl font-extrabold text-[#f97316] italic mb-2">About Us</Text>
              <Text className="text-slate-300 text-lg font-medium">
                Transforming urban mobility, one shared ride at a time.
              </Text>
            </View>

            {/* Mission Card */}
            <LinearGradient
              colors={['rgba(30, 41, 59, 0.8)', 'rgba(15, 23, 42, 0.9)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-3xl border border-white/10 p-6 mb-8 shadow-2xl"
            >
              <Text className="text-white text-xl font-bold mb-4">Our Mission</Text>
              <Text className="text-slate-300 text-base leading-7">
                Urbanmove is designed to revolutionize daily commuting. We connect verified professionals with similar routes to create a more affordable, eco-friendly, and community-driven transportation network. By fostering shared journeys, we aim to build stronger connections and a greener future for our cities.
              </Text>
            </LinearGradient>

            {/* Features Grid */}
            <View className="flex-row flex-wrap justify-between mb-8">
              {features.map((feature, index) => (
                <View key={index} className="w-[48%] mb-4">
                  <LinearGradient
                    colors={['rgba(30, 41, 59, 0.6)', 'rgba(15, 23, 42, 0.7)']}
                    className="p-4 rounded-2xl border border-white/5 h-full"
                  >
                    <View className="bg-orange-500/20 w-10 h-10 rounded-full items-center justify-center mb-3">
                      <MaterialCommunityIcons name={feature.icon} size={20} color="#f97316" />
                    </View>
                    <Text className="text-white font-bold text-base mb-2">{feature.title}</Text>
                    <Text className="text-slate-400 text-xs leading-5">{feature.description}</Text>
                  </LinearGradient>
                </View>
              ))}
            </View>

            <View className="h-10" />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  )
}

export default About