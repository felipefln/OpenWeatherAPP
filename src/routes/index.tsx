import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SearchPage } from "../pages/Search";
import { WeatherPage } from "../pages/Weather";

const { Navigator, Screen } = createStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Pesquisa" component={SearchPage} />
        <Screen name="Clima" component={WeatherPage} />
      </Navigator>
    </NavigationContainer>
  );
};
