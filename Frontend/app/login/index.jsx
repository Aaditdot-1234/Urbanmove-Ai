import Navbar from "@/components/created/navbar";
import useLoginForm from "@/hooks/use-login-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

const Login = () => {
    const { formData, setFormData, handleLogin, error } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);

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

                    <View className="flex-1 flex-row pt-24">
                        <View className="flex-1 px-4">
                            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                                <View className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 mb-8">
                                    <Text className="text-slate-400 text-sm font-medium mb-6 uppercase tracking-widest">
                                        Login
                                    </Text>

                                    <View className="gap-4 mb-6">
                                        <View>
                                            <Text className="text-slate-300 text-sm mb-2 ml-1">Email</Text>
                                            <View className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">✉️</Text>
                                                <TextInput
                                                    placeholder="you@example.com"
                                                    placeholderTextColor="#64748b"
                                                    className="flex-1 text-white text-base outline-none"
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    value={formData.email}
                                                    onChangeText={(text) =>
                                                        setFormData({ ...formData, email: text })
                                                    }
                                                />
                                            </View>
                                            {error.email ? (
                                                <Text className="text-red-400 text-xs mt-1 ml-1">
                                                    {error.email}
                                                </Text>
                                            ) : null}
                                        </View>

                                        <View>
                                            <Text className="text-slate-300 text-sm mb-2 ml-1">Password</Text>
                                            <View className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">🔒</Text>
                                                <TextInput
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#64748b"
                                                    className="flex-1 text-white text-base outline-none"
                                                    secureTextEntry={!showPassword}
                                                    value={formData.password}
                                                    onChangeText={(text) =>
                                                        setFormData({ ...formData, password: text })
                                                    }
                                                />
                                                <Pressable onPress={() => setShowPassword(!showPassword)} className="ml-2">
                                                    <MaterialCommunityIcons
                                                        name={showPassword ? "eye-off" : "eye"}
                                                        size={20}
                                                        color="#64748b"
                                                    />
                                                </Pressable>
                                            </View>
                                            {error.password ? (
                                                <Text className="text-red-400 text-xs mt-1 ml-1">
                                                    {error.password}
                                                </Text>
                                            ) : null}
                                        </View>
                                    </View>

                                    <Pressable onPress={handleLogin} className="shadow-lg shadow-orange-900/30">
                                        <LinearGradient
                                            colors={["#f97316", "#c2410c"]}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            className="py-4 rounded-xl items-center"
                                        >
                                            <Text className="text-white text-base font-bold tracking-wide">
                                                Login
                                            </Text>
                                        </LinearGradient>
                                    </Pressable>

                                    <View className="flex-row justify-center items-center gap-2 mt-6">
                                        <Text className="text-slate-400 text-sm">
                                            Don't have an account?
                                        </Text>
                                        <Link href="/register">
                                            <Text className="text-orange-400 text-sm font-semibold">
                                                Register
                                            </Text>
                                        </Link>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </>
    );
};

export default Login;
