import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import sun from "./assets/sun.png";
import cloud from "./assets/cloud.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import storm from "./assets/storm.png";
import brclouds from "./assets/brclouds.png";

export default function ForecastUnit({ temperature, clouds, wind, date }) {
  const sky = {
    Clouds: cloud,
    Clear: sun,
    Rain: rain,
    Snow: snow,
    BrokenClouds: brclouds,
    Storm: storm,
  };
  return (
    <View>
      <Text>Data: {date}</Text>
      <Text>Temperatura: {temperature} °C</Text>
      <Image
        resizeMode="contain"
        style={{ width: 100, height: 50 }}
        source={sky[clouds]}
      />
      <Text>Wiatr: {wind} km/h</Text>
    </View>
  );
}
