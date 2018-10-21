import React from "react";
import { Circle } from "react-native-maps";

export default props => (
  <Circle
    strokeColor="transparent"
    fillColor="rgba(50,80,190,.35)"
    {...props}
  />
);
