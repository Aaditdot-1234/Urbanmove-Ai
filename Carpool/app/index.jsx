import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import "../global.css";
import Card from './Components/card';
import Navbar from './Components/navbar';

const app = () => {
  const para1 = "Experience a premium one-time ride with top-rated drivers. Perfect for special occasions or quick trips around the city."
  const para2 = "Join our regular commuting community. Save money and environment by sharing your daily ride with verified professionals."

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
          <View className='flex-1 items-center justify-center pt-20 px-4'>
            <Card
              title="ONE TIME RIDE"
              para={para1}
              link='/ride'
              iconName="car-convertible"
            />
            <Card
              title="REGULAR RIDE"
              para={para2}
              link='/ride'
              iconName="account-group"
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </PaperProvider>
  )
}

export default app