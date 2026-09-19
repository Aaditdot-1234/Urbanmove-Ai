import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const RideList = () => {
    // Mock data based on Image 2 structure
    const rides = [
        { id: 1, source: 'New York', destination: 'Boston', carType: 'Sedan', time: '10:00 AM', price: '$50' },
        { id: 2, source: 'San Francisco', destination: 'Los Angeles', carType: 'SUV', time: '02:00 PM', price: '$80' },
        { id: 3, source: 'Chicago', destination: 'Detroit', carType: 'Hatchback', time: '09:30 AM', price: '$40' },
        { id: 4, source: 'Miami', destination: 'Orlando', carType: 'Convertible', time: '11:00 AM', price: '$90' },
        { id: 5, source: 'Seattle', destination: 'Portland', carType: 'Minivan', time: '01:15 PM', price: '$60' },
        { id: 6, source: 'Austin', destination: 'Houston', carType: 'Sedan', time: '03:45 PM', price: '$45' },
        { id: 7, source: 'Denver', destination: 'Aspen', carType: 'SUV', time: '08:00 AM', price: '$120' },
    ];

    return (
        <View className="flex-1 bg-slate-900 rounded-2xl overflow-hidden border border-white/5 mb-4">
            {/* Header Row */}
            <View className="flex-row bg-slate-900 py-3 px-4 border-b border-white/10">
                {/* <Text className="flex-1 text-slate-400 font-medium text-xs">Sr no.</Text> */}
                <Text className="flex-[2] text-slate-400 font-medium text-xs">Source</Text>
                <Text className="flex-[2] text-slate-400 font-medium text-xs">Destination</Text>
                {/* <Text className="flex-[1.5] text-slate-400 font-medium text-xs">Car Type</Text> */}
                <Text className="flex-[1.5] text-slate-400 font-medium text-xs">Time</Text>
                <Text className="flex-1 text-slate-400 font-medium text-xs text-right">$</Text>
                {/* <Text className="w-16 text-slate-400 font-medium text-xs text-center">Actions</Text> */}
            </View>

            {/* List Rows */}
            <ScrollView className="flex-1">
                {rides.map((ride, index) => (
                    <View key={ride.id} className="flex-row items-center py-3 px-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                        {/* <Text className="flex-1 text-white font-semibold text-sm">{index + 1}</Text> */}

                        <View className="flex-[2] flex-row items-center gap-2">
                            {/* Placeholder for icon/logo if needed */}
                            {/* <View className="w-6 h-6 rounded-full bg-orange-500/20 items-center justify-center">
                                <Text className="text-orange-500 text-[10px] font-bold">{ride.source.substring(0, 1) || index + 1}</Text>
                            </View> */}
                            <Text className="text-white font-medium text-sm">{ride.source}</Text>
                        </View>

                        <Text className="flex-[2] text-slate-300 text-sm">{ride.destination}</Text>

                        {/* <View className="flex-[1.5]">
                            <View className={`self-start px-2 py-0.5 rounded-full ${ride.carType === 'SUV' ? 'bg-blue-500/20' :
                                ride.carType === 'Sedan' ? 'bg-green-500/20' : 'bg-purple-500/20'
                                }`}>
                                <Text className={`text-[10px] font-medium ${ride.carType === 'SUV' ? 'text-blue-400' :
                                    ride.carType === 'Sedan' ? 'text-green-400' : 'text-purple-400'
                                    }`}>{ride.carType}</Text>
                            </View>
                        </View> */}

                        <Text className="flex-[1.5] text-slate-300 text-sm">{ride.time}</Text>
                        <Text className="flex-1 text-white font-bold text-sm text-right">{ride.price}</Text>

                        {/* <View className="w-16 flex-row justify-center gap-1">
                            <Pressable className="p-1.5 hover:bg-white/10 rounded-lg">
                                <Text className="text-slate-400 text-xs">✏️</Text>
                            </Pressable>
                            <Pressable className="p-1.5 hover:bg-white/10 rounded-lg">
                                <Text className="text-slate-400 text-xs">🗑️</Text>
                            </Pressable>
                        </View> */}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default RideList;
