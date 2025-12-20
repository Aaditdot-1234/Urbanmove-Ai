import React from 'react';
import { Pressable, Text, View } from 'react-native';

const Sidebar = () => {
    const menuItems = [
        { name: 'Clients', icon: '👥' }, // Placeholder icons
        { name: 'Providers', icon: '💳' },
        { name: 'Payments', icon: '💵' },
        { name: 'Disputes', icon: '💬' },
        { name: 'Customers', icon: '👤' },
        { name: 'Statistics', icon: '📊' },
        { name: 'Settings', icon: '⚙️' },
    ];

    return (
        <View className="w-20 h-full bg-slate-900 border-r border-white/10 flex-col items-center py-6">
            <View className="mb-8">
                <Text className="text-orange-500 text-2xl font-extrabold">C</Text>
            </View>
            <View className="flex-1 gap-6 w-full items-center">
                {menuItems.map((item, index) => (
                    <Pressable key={index} className="items-center justify-center w-12 h-12 rounded-xl hover:bg-white/5">
                        <Text className="text-xl">{item.icon}</Text>
                    </Pressable>
                ))}
            </View>

            {/* <View className="mt-auto gap-4">
                <Link href="/" asChild>
                    <Pressable className="items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10">
                        <Text className="text-orange-500 font-bold">Exit</Text>
                    </Pressable>
                </Link>
            </View> */}
        </View>
    );
};

export default Sidebar;