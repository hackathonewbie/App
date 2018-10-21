/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import _ from "lodash";
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import Circle from "../components/Circle";
import { haversineDistance } from "../utils/geolocation";

const INITIAL_REGION = {
  latitude: 25.032474,
  longitude: 121.564714,
  latitudeDelta: 4,
  longitudeDelta: 4
};

type Props = {};
export default class App extends Component<Props> {
  state = {
    dots: [],
    focusItem: null,
    region: INITIAL_REGION
  };

  async componentDidMount() {
    this.fetchDots(INITIAL_REGION);
  }

  fetchDots = _.debounce(async region => {
    const bounding = this.getBoundingBox(region);
    console.log("=====");
    console.log("fetch region", region);
    const { lat1, lon1, lat2, lon2 } = bounding;
    console.log("bounding", bounding);
    const res = await fetch(
      `http://ec2-54-255-197-171.ap-southeast-1.compute.amazonaws.com:3030/chlor_a/?lat1=${lat1}&lon1=${lon1}&lat2=${lat2}&lon2=${lon2}`
    );
    const resJSON = await res.json();
    console.log("response", resJSON);
    this.setState({ dots: resJSON });
  }, 500);

  handleFillColor = val => {
    let opacity;
    if (val >= 0 && val <= 5) {
      opacity = 0.3;
    } else if (val > 5 && val <= 20) {
      opacity = 0.6;
    } else if (val > 20) {
      opacity = 0.9;
    } else {
      opacity = 1;
    }
    opacity = val * 1.2;
    return `rgba(50,80,190,${opacity})`;
  };

  // onCirclePress = item => {
  //   this.setState({ focusItem: item });
  // };

  checkCoords = pressedCoords => {
    console.log(pressedCoords);
    const formatedPressedCoords = {
      lng: pressedCoords.longitude,
      lat: pressedCoords.latitude
    };
    const { dots } = this.state;
    for (let dot of dots) {
      const distance = haversineDistance(formatedPressedCoords, dot.pos);
      if (distance <= 2) {
        console.log("distance", distance);
        this.setState({ focusItem: dot });
        break;
      }
      if (
        dot.pos.lat === dots[dots.length - 1].pos.lat &&
        dot.pos.lng === dots[dots.length - 1].pos.lng
      ) {
        this.setState({ focusItem: null });
      }
    }
  };

  onRegionChangeComplete = region => {
    console.log("region", region);
    this.fetchDots(region);
    this.setState({ region });
  };

  getBoundingBox = region => {
    if (region) {
      return {
        lon1: region.longitude - region.longitudeDelta / 2, // westLng - min lng
        lat1: region.latitude + region.latitudeDelta / 2, // northLat - max lat

        lon2: region.longitude + region.longitudeDelta / 2, // eastLng - max lng
        lat2: region.latitude - region.latitudeDelta / 2 // southLat - min lat
      };
    } else {
      return null;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: 25.032474,
            longitude: 121.564714,
            latitudeDelta: 4,
            longitudeDelta: 4
          }}
          minZoomLevel={6}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsMyLocationButton
          showsUserLocation
          onPress={event => this.checkCoords(event.nativeEvent.coordinate)}
        >
          {this.state.dots.map(item => (
            <Circle
              key={`${item.pos.lat}_${item.pos.lng}`}
              center={{ latitude: item.pos.lat, longitude: item.pos.lng }}
              radius={(item.res / 2) * 1000}
              fillColor={this.handleFillColor(item.val)}
              strokeColor={
                this.state.focusItem &&
                `${item.pos.lat}_${item.pos.lng}` ===
                  `${this.state.focusItem.pos.lat}_${
                    this.state.focusItem.pos.lng
                  }`
                  ? "rgba(200, 100, 100, 0.8)"
                  : "transparent"
              }
            />
          ))}
        </MapView>
        {this.state.focusItem && (
          <View
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: 0,
              height: 100,
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <Text>Lat: {this.state.focusItem.pos.lat}</Text>
            <Text>Lng: {this.state.focusItem.pos.lng}</Text>
            <Text>Chlorophyll: {this.state.focusItem.val} μg/L</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
