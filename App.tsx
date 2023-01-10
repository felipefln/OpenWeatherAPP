import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { Provider } from "react-redux";

import { store } from "./src/store";
// import { Button } from "./src/components/Button";
// import { Spinner } from "./src/components/Spinner";
// import { ReloadIcon } from "./src/components/ReloadIcon";
// import { PreviousSearch } from "./src/components/PreviousSearch";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
