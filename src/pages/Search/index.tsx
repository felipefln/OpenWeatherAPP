import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks";

import {
  getWeatherOnCityTyped,
  getWeatherOnCurrentLocation,
  setErrorMessage,
} from "../../store/weather/index";
import { Button } from "../../components/Button";
import { PreviousSearch } from "../../components/PreviousSearch";

import { styles } from "./styles";
import { Spinner } from "../../components/Spinner";

export const SearchPage = () => {
  const [cityTyped, setCityTyped] = useState("");

  const errorMsg = useAppSelector((state) => state.weather.errorMsg);
  const prevSearches = useAppSelector((state) => state.weather.prevSearches);
  const isLoading = useAppSelector((state) => state.weather.isLoading);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleSubmitCityTyped = async () => {
    if (cityTyped.length === 0) {
      dispatch(setErrorMessage("location is empty."));
      return;
    }
    const wasFound = await dispatch(getWeatherOnCityTyped(cityTyped));

    if (wasFound === false) return;

    // navigation.navigate('Weather');
    setCityTyped("");
    dispatch(setErrorMessage(""));
  };

  const handleSubmitCurrentLocation = async () => {
    const wasFound = await dispatch(getWeatherOnCurrentLocation());

    if (wasFound === false) return;

    // navigation.navigate('Weather');
    setCityTyped("");
    dispatch(setErrorMessage(""));
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.titleInput}>Digite sua localização aqui:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Florianópolis"
            value={cityTyped}
            onChangeText={setCityTyped}
          />
          {!!errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Button onPress={handleSubmitCityTyped}>Enviar</Button>
              <Button onPress={handleSubmitCurrentLocation}>
                <MaterialIcons name="gps-fixed" size={30} color="white" />
                Localização
              </Button>
            </>
          )}
        </View>
        {prevSearches.length > 0 && (
          <View>
            <Text style={styles.titlePreviousSearches}>
              Pesquisas anteriores:
            </Text>
            <View>
              {prevSearches.map((search, index) => (
                <PreviousSearch
                  key={index}
                  city={search.city}
                  details={search.details}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
