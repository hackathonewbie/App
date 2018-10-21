import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Router, Stack, Scene, Actions } from "react-native-router-flux";
import DefaultScreen from "./screens/DefaultScreen";
import Register from "./screens/Register";
import Icon from "react-native-vector-icons/Ionicons";

export default (App = () => (
  <Router>
    <Stack
      key="root"
      renderRightButton={
        <TouchableOpacity
          onPress={() => {
            Actions.registerEmail();
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingRight: 10
          }}
        >
          <Icon name="md-notifications-outline" size={25} />
        </TouchableOpacity>
      }
    >
      <Scene
        key="map"
        component={DefaultScreen}
        navBar={props => (
          <View
            style={{
              marginTop: 20,
              backgroundColor: "white",
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Eutrophication Observing System
            </Text>
          </View>
        )}
      />
      <Scene key="registerEmail" component={Register} title="Register" />
    </Stack>
  </Router>
));
