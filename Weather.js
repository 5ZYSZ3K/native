import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Weather({ value, styles }) {
  return <Text style={styles == "bold" ? { fontSize: 28 } : {}}>{value}</Text>;
}
