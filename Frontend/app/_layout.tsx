import Toast from "@/components/created/Toast";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider as PaperProvider } from "react-native-paper";
import "../global.css";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
      <Toast />
    </PaperProvider>
  );
}
