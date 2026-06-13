import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ToastLib from "react-native-toast-message";

const TYPES = {
  success: {
    border: "#22c55e",
    iconBg: "rgba(34,197,94,0.12)",
    icon: "check-circle",
    iconColor: "#22c55e",
  },
  error: {
    border: "#f87171",
    iconBg: "rgba(248,113,113,0.12)",
    icon: "alert-circle",
    iconColor: "#f87171",
  },
  info: {
    border: "#818cf8",
    iconBg: "rgba(129,140,248,0.12)",
    icon: "information",
    iconColor: "#818cf8",
  },
};

const ToastItem = ({ text1, text2, type }) => {
  const t = TYPES[type] ?? TYPES.info;
  return (
    <View style={[styles.container, { borderLeftColor: t.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: t.iconBg }]}>
        <MaterialCommunityIcons name={t.icon} size={22} color={t.iconColor} />
      </View>
      <View style={styles.textWrap}>
        {text1 ? (
          <Text style={styles.title} numberOfLines={2}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {text2}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0e1525",
    borderRadius: 12,
    borderLeftWidth: 4,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    flexShrink: 0,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
    lineHeight: 17,
  },
});

export const toastConfig = {
  success: (props) => <ToastItem {...props} type="success" />,
  error: (props) => <ToastItem {...props} type="error" />,
  info: (props) => <ToastItem {...props} type="info" />,
};

export default function Toast() {
  return <ToastLib config={toastConfig} visibilityTime={3500} topOffset={60} />;
}
