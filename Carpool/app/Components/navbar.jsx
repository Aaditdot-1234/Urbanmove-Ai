import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

const Navbar = () => {
  return (
    <View className="absolute top-0 z-50 w-full pt-6 pb-4 px-4 flex-row justify-between items-center bg-slate-900/80 border-b border-white/10 backdrop-blur-md">
      <Link href="/">
        <Text className="text-orange-500 text-xl font-extrabold tracking-wider">Urbanmove</Text>
      </Link>
      <View className="flex-row items-center gap-6">
        <Link href="/ride" asChild>
          <Pressable>
            <Text className="text-slate-200 text-[14px] font-medium hover:text-white transition-colors">Ride</Text>
          </Pressable>
        </Link>
        <Link href="/about" asChild>
          <Pressable>
            <Text className="text-slate-200 text-[14px] font-medium hover:text-white transition-colors">About</Text>
          </Pressable>
        </Link>
        <Link href="/support" asChild>
          <Pressable>
            <Text className="text-slate-200 text-[14px] font-medium hover:text-white transition-colors">Support</Text>
          </Pressable>
        </Link>
        <Link href="/login" asChild>
          <Pressable className="ml-2 rounded-full shadow-lg shadow-orange-500/20">
            <LinearGradient
              colors={["#f97316", "#ea580c"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="px-3 py-1 rounded-full"
            >
              <Text className="text-white text-base font-bold tracking-wide">Login</Text>
            </LinearGradient>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default Navbar;
