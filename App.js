import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import axios from "axios";
import Weather from "./Weather";

export default function App({ navigation }) {
  const [weather, setWeather] = useState(false);
  const [inputValue, setValue] = useState("");
  const [toSendValue, setToSend] = useState("Krakow");
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          toSendValue +
          "&appid=057e0edc53f0148f0dcd24cd05e87d3c"
      )
      .then((res) => {
        setWeather(res.data);
        const g =
          res.data.wind.deg - 22.5 > 0
            ? res.data.wind.deg - 22.5
            : res.data.wind.deg - 22.5 + 360;
        const windDirection = (g - (g % 45)) / 45;
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        setWeather({ ...res.data, windDirection: directions[windDirection] });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setWeather, toSendValue]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <View style={styles.name}>
          <Weather
            styles="bold"
            value={
              weather ? weather.sys.country + " " + weather.name : "Pl, Krakuw"
            }
          />
        </View>
        <View style={styles.basics}>
          <Weather
            value={
              weather
                ? "Temperatura: " +
                  Math.round((weather.main.temp - 273.15) * 100) / 100
                : "Temperatura: pewnie pizdzi"
            }
          />
          <Weather
            value={
              weather
                ? "Temperatura odczuwalna: " +
                  Math.round((weather.main.feels_like - 273.15) * 100) / 100
                : "Temperatura odczuwalna: idk"
            }
          />
          <Weather
            value={
              weather
                ? "Zachmurzenie: " + weather.weather[0].description
                : "Zachmurzenie: do tego czasu chyba ogarnales, ze ta pogoda nie dziala"
            }
          />
          <Weather
            value={
              weather
                ? "Predkosc wiatru: " +
                  Math.round(weather.wind.speed * 3.6 * 100) / 100 +
                  "km/h"
                : "Predkosc wiatru: Alez wieje"
            }
          />
          <Weather
            value={
              weather
                ? "Wilgotnosc: " + weather.main.humidity + "%"
                : "Wilgotnosc: mokro"
            }
          />
        </View>
        <View style={styles.addons}>
          <Text style={{ fontSize: 28 }}>Dodatkowe (fajne) statystyki</Text>
        </View>
        <View style={styles.rest}>
          <Weather
            value={
              weather
                ? "Cisnienie: " + weather.main.pressure + " hpa"
                : "Cisnienie: cisnie"
            }
          />
          <Weather
            value={
              weather
                ? "Porywy wiatru: " + weather.wind.gust
                : "Smak wiatru: smaczny"
            }
          />
          <Weather
            value={
              weather
                ? "Kierunek wiatru: " + weather.windDirection
                : "Kat wiatru: 2 radiany"
            }
          />
          <Weather
            value={
              weather
                ? "Wschod slonca: " + new Date(weather.sys.sunrise * 1000)
                : "Wschod slonca: po jutrzni"
            }
          />
          <Weather
            value={
              weather
                ? "Zachod slonca: " + new Date(weather.sys.sunset * 1000)
                : "Zachod slonca: po barce"
            }
          />
          <Weather
            value={
              weather
                ? "Od zera absolutnego dzieli nas: " + weather.main.temp + "C"
                : "Od zera absolutnego dzieli nas niestety sporo"
            }
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          placeholder="placeholder"
        />
        <Button
          onPress={() => {
            setToSend(inputValue);
          }}
          title="Send"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          title="Go to forecast"
          onPress={() => navigation.navigate("Forecast", { city: toSendValue })}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    backgroundColor: "#8dc3e0",
    width: "100%",
    paddingLeft: "15%",
    paddingTop: "1%",
    textAlign: "center",
    paddingBottom: "2%",
  },
  basics: {
    paddingBottom: "2%",
    paddingTop: "2%",
    backgroundColor: "#eee",
    width: "100%",
    paddingLeft: "15%",
  },
  addons: {
    paddingBottom: "2%",
    paddingTop: "2%",
    backgroundColor: "#8dc3e0",
    width: "100%",
    paddingLeft: "15%",
  },
  rest: {
    paddingBottom: "2%",
    paddingTop: "2%",
    backgroundColor: "#eee",
    width: "100%",
    paddingLeft: "15%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
