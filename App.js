import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import {
  useFonts,
  Roboto_900Black,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import LoginScreen from "./LoginScreen";
import UserScreen from "./UserScreen";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FD6500",
    secondary: "#1C1C1C",
    tertiary: "#FDFEFF",
    info: "#2196F3",
  },
};

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_900Black, Roboto_400Regular });
  const [user, setUser] = useState(null);

  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {!user ? (
          <LoginScreen user={user} setUser={setUser} />
        ) : (
          <UserScreen user={user} />
        )}
      </QueryClientProvider>
    </PaperProvider>
  );
}
