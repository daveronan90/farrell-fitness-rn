import { Roboto_900Black, useFonts } from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-url-polyfill/auto";
import EventsScreen from "./components/EventsScreen";
import LoginScreen from "./components/LoginScreen";
import UserScreen from "./components/UserScreen";
import { supabase } from "./supabase";
import theme from "./theme";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_900Black });
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          {session && session.user ? (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarStyle: {
                  backgroundColor: theme.colors.secondary,
                  borderTopWidth: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName: keyof typeof Ionicons.glyphMap = "link";

                  if (route.name === "User") {
                    iconName = focused
                      ? "person-circle"
                      : "person-circle-outline";
                  } else if (route.name === "Events") {
                    iconName = focused ? "bicycle" : "bicycle-outline";
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="User">
                {() => <UserScreen session={session} />}
              </Tab.Screen>

              <Tab.Screen name="Events">
                {() => <EventsScreen session={session} />}
              </Tab.Screen>
            </Tab.Navigator>
          ) : (
            <LoginScreen />
          )}
        </PaperProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
