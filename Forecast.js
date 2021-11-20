import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";
import ForecastUnit from "./ForecastUnit";

export default function Forecast({ route }) {
  const [weather, setWeather] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          (route?.params?.city || "Krakow") +
          "&appid=057e0edc53f0148f0dcd24cd05e87d3c"
      )
      .then((res) => {
        setWeather(res.data);
      })
      .catch(console.log);
  }, [setWeather]);
  return (
    <ScrollView>
      <View style={styles.container}>
        {weather ? (
          weather.list.map((x, i) => {
            let data = new Date(x.dt * 1000).toString().split(" ");
            data = [
              data[0],
              data[1],
              data[2],
              (data[4].charAt(0) == 0 ? "" : data[4].charAt(0)) +
                data[4].charAt(1) +
                ":00",
            ].join(" ");
            return (
              <View key={i} style={styles.daily}>
                <ForecastUnit
                  date={data}
                  temperature={Math.round((x.main.temp - 273.15) * 100) / 100}
                  clouds={x.weather[0].main}
                  wind={Math.round(x.wind.speed * 3.6 * 100) / 100}
                />
              </View>
            );
          })
        ) : (
          <Text>Nie dziala</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  daily: {
    width: "50%",
    paddingBottom: "2%",
  },
});
