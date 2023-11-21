import React from "react";

import { ThemeProvider } from "styled-components";

import theme from "./src/theme";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import Loading from "@components/Loading";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar translucent style="light" />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
