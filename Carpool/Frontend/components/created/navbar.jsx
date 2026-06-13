import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View className="overflow-visible absolute top-0 z-50 w-full pt-6 pb-4 px-4 flex-row justify-between items-center bg-slate-900/80 border-b border-white/10 backdrop-blur-md">
      <Link href="/">
        <Text className="text-orange-500 text-2xl font-extrabold tracking-wider">Urbanmove</Text>
      </Link>
      {isMobile ? (
        <View ref={ref}>
          <Pressable onPress={handleMenuPress}>
            <Text className="color-white font-bold text-xl">Menu</Text>
            {isMenuOpen && (
              <View className="absolute top-full right-0 mt-2 w-48 bg-slate-900/95 border border-white/20 rounded-lg shadow-2xl py-2 z-20">
                <Link href="/" asChild>
                  <Pressable className="px-4 py-2 hover:bg-white/10">
                    <Text className="text-slate-200 font-medium text-sm">Home</Text>
                  </Pressable>
                </Link>
                <Link href="/ride" asChild>
                  <Pressable className="px-4 py-2 hover:bg-white/10">
                    <Text className="text-slate-200 font-medium text-sm">Ride</Text>
                  </Pressable>
                </Link>
                <Link href="/about" asChild>
                  <Pressable className="px-4 py-2 hover:bg-white/10">
                    <Text className="text-slate-200 font-medium text-sm">About</Text>
                  </Pressable>
                </Link>
                <Link href="/support" asChild>
                  <Pressable className="px-4 py-2 hover:bg-white/10">
                    <Text className="text-slate-200 font-medium text-sm">Support</Text>
                  </Pressable>
                </Link>
                <Link href="/login" asChild>
                  <Pressable className="mx-2 mt-2 p-2 rounded-full shadow-lg shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-orange-600">
                    <Text className="text-white text-sm font-bold tracking-wide">Login</Text>
                  </Pressable>
                </Link>
              </View>
            )}
          </Pressable>
        </View>
      ) : (
        <View className="flex-row items-center gap-6">
          <Link href="/" asChild>
            <Pressable>
              <Text className="text-slate-200 text-[14px] font-medium hover:text-white transition-colors">Home</Text>
            </Pressable>
          </Link>
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
                colors={["#f97316", "#c2410c"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="px-3 py-1 rounded-full"
              >
                <Text className="text-white text-base font-bold tracking-wide">Login</Text>
              </LinearGradient>
            </Pressable>
          </Link>
        </View>
      )}
    </View>
  );
};

export default Navbar;
