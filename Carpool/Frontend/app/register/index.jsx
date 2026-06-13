import Navbar from "@/components/created/navbar";
import useRegisterForm from "@/hooks/use-register-form";
import { pickImage } from "@/services/imagePickerService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

const Register = () => {
    const { formData, setFormData, handlePublish, error } = useRegisterForm();
    const [showPassword, setShowPassword] = useState(false);

    const selectImage = async () => {
        const imageUri = await pickImage();
        if (imageUri) {
            setFormData({ ...formData, profilePicture: imageUri });
        }
    };

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
                                        Create Account
                                    </Text>

                                    <View className="gap-4 mb-6">
                                        <View>
                                            <Text className="text-slate-300 text-sm mb-2 ml-1">Full Name</Text>
                                            <View className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">👤</Text>
                                                <TextInput
                                                    placeholder="Your name"
                                                    placeholderTextColor="#64748b"
                                                    className="flex-1 text-white text-base outline-none"
                                                    autoCapitalize="words"
                                                    value={formData.name}
                                                    onChangeText={(text) =>
                                                        setFormData({ ...formData, name: text })
                                                    }
                                                />
                                            </View>
                                            {error.name ? (
                                                <Text className="text-red-400 text-xs mt-1 ml-1">
                                                    {error.name}
                                                </Text>
                                            ) : null}
                                        </View>

                                        <View className="flex-row gap-4">
                                            <View className="flex-1">
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

                                            <View className="flex-1">
                                                <Text className="text-slate-300 text-sm mb-2 ml-1">
                                                    Phone Number
                                                </Text>
                                                <View className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">📞</Text>
                                                    <TextInput
                                                        placeholder="+1 234 567 8900"
                                                        placeholderTextColor="#64748b"
                                                        className="flex-1 text-white text-base outline-none"
                                                        keyboardType="phone-pad"
                                                        value={formData.phone}
                                                        onChangeText={(text) =>
                                                            setFormData({ ...formData, phone: text })
                                                        }
                                                    />
                                                </View>
                                                {error.phone ? (
                                                    <Text className="text-red-400 text-xs mt-1 ml-1">
                                                        {error.phone}
                                                    </Text>
                                                ) : null}
                                            </View>
                                        </View>

                                        <View className="flex-row gap-4">
                                            <View className="flex-1">
                                                <Text className="text-slate-300 text-sm mb-2 ml-1">City</Text>
                                                <View className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3">
                                                    <Text className="text-slate-400 mr-3">📍</Text>
                                                    <TextInput
                                                        placeholder="Your city"
                                                        placeholderTextColor="#64748b"
                                                        className="flex-1 text-white text-base outline-none"
                                                        autoCapitalize="words"
                                                        value={formData.city}
                                                        onChangeText={(text) =>
                                                            setFormData({ ...formData, city: text })
                                                        }
                                                    />
                                                </View>
                                                {error.city ? (
                                                    <Text className="text-red-400 text-xs mt-1 ml-1">
                                                        {error.city}
                                                    </Text>
                                                ) : null}
                                            </View>

                                            <View className="flex-1">
                                                <Text className="text-slate-300 text-sm mb-2 ml-1">
                                                    Profile Picture
                                                </Text>
                                                <Pressable
                                                    onPress={selectImage}
                                                    className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3"
                                                >
                                                    <Text className="text-slate-400 mr-3">📸</Text>
                                                    <Text className="text-slate-400 text-sm">
                                                        {formData.profilePicture
                                                            ? "Change Image"
                                                            : "Select Image"}
                                                    </Text>
                                                </Pressable>

                                                {formData.profilePicture ? (
                                                    <Image
                                                        source={{ uri: formData.profilePicture }}
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                            marginTop: 8,
                                                            borderRadius: 8,
                                                        }}
                                                    />
                                                ) : null}
                                            </View>
                                        </View>

                                        <View>
                                            <Text className="text-slate-300 text-sm mb-2 ml-1">Password</Text>
                                            <View className="flex-row items-center bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3">
                                                <Text className="text-slate-400 mr-3">🔒</Text>
                                                <TextInput
                                                    placeholder="Min 8 characters"
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

                                    <View className="gap-3">
                                        <Pressable
                                            onPress={handlePublish}
                                            className="shadow-lg shadow-orange-900/30"
                                        >
                                            <LinearGradient
                                                colors={["#f97316", "#c2410c"]}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 1 }}
                                                className="py-4 rounded-xl items-center"
                                            >
                                                <Text className="text-white text-base font-bold tracking-wide">
                                                    Register
                                                </Text>
                                            </LinearGradient>
                                        </Pressable>

                                        <View className="flex-row items-center gap-3 my-1">
                                            <View className="flex-1 h-px bg-white/10" />
                                            <Text className="text-slate-500 text-sm">or continue with</Text>
                                            <View className="flex-1 h-px bg-white/10" />
                                        </View>

                                        <View className="flex-row gap-3">
                                            <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/60 border border-white/10">
                                                <Text className="text-white text-sm font-semibold">
                                                    🌐 Google
                                                </Text>
                                            </Pressable>
                                            <Pressable className="flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/60 border border-white/10">
                                                <Text className="text-white text-sm font-semibold">
                                                    Facebook
                                                </Text>
                                            </Pressable>
                                        </View>
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

export default Register;
