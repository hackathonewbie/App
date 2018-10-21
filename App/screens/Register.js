import React, { Component } from "react";
import { Alert, Text, View, TextInput, TouchableOpacity } from "react-native";

export default class Register extends Component {
  state = {
    mail: ""
  };

  onChangeText = text => {
    this.setState({ mail: text });
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 40, alignItems: "center" }}>
        <Text style={{ padding: 15, fontSize: 20 }}>取得最新資料信件通知</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="信箱"
          onChangeText={this.onChangeText}
          style={{
            // justifyContent: "center",
            // alignItems: "center",
            fontSize: 20
          }}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => {
            setTimeout(() => {
              Alert.alert("註冊成功");
            }, 400);
          }}
        >
          <Text
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              padding: 30,
              color: "blue",
              fontSize: 20
            }}
          >
            送出
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
