import Card from "@/components/created/card";
import Navbar from "@/components/created/navbar";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const para1 =
    "Experience a premium one-time ride with top-rated drivers. Perfect for special occasions or quick trips around the city.";
const para2 =
    "Join our regular commuting community. Save money and the environment by sharing your daily ride with verified professionals.";

const App = () => {
    return (
        <>
            <StatusBar style="light" />
            <LinearGradient
                colors={["#080d1a", "#0f0e2d"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="overflow-hidden flex-1"
            >
                <SafeAreaView className="overflow-hidden flex-1">
                    <Navbar />
                    <View className="flex-1 items-center justify-center pt-20 px-4">
                        <Card
                            title="ONE TIME RIDE"
                            para={para1}
                            link="/ride"
                            iconName="car-convertible"
                        />
                        <Card
                            title="REGULAR RIDE"
                            para={para2}
                            link="/ride"
                            iconName="account-group"
                        />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </>
    );
};

export default App;
