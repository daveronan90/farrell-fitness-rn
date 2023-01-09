import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { Text } from "react-native-paper";
import Dots from "../assets/Dots.svg";
import Logo from "../assets/Logo.svg";
import theme from "../theme";
import FFModal from "./FFModal";

const LoginScreen = () => {
  const [visibility, setVisibility] = useState(false);
  const [formType, setFormType] = useState("login");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dots_bottom}>
        <Dots />
      </View>
      <View style={styles.dots_top}>
        <Dots />
      </View>
      <Logo width={327} height={218} />
      <View>
        <Text variant="displayMedium" style={styles.title}>
          Farrell Fitness
        </Text>
        <Text variant="displaySmall" style={styles.title}>
          Gym & Performance Center
        </Text>
      </View>
      <View style={styles.button_wrapper}>
        <View
          style={[
            { backgroundColor: theme.colors.primary },
            styles.button_container,
          ]}
        >
          <Pressable
            style={styles.button}
            onPress={() => {
              setFormType("login");
              setVisibility(true);
            }}
          >
            <Text style={styles.button_text}>Login</Text>
          </Pressable>
        </View>
        <View
          style={[
            { backgroundColor: theme.colors.info },
            styles.button_container,
          ]}
        >
          <Pressable
            style={styles.button}
            onPress={() => {
              setFormType("signUp");
              setVisibility(true);
            }}
          >
            <Text style={styles.button_text}>Sign Up Now</Text>
          </Pressable>
        </View>
      </View>
      <FFModal
        visibility={visibility}
        setVisibility={setVisibility}
        formType={formType}
      />
      <StatusBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 104,
    paddingHorizontal: 24,
  },
  dots_bottom: { position: "absolute", bottom: 0, left: 0 },
  dots_top: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
  },
  title: {
    color: theme.colors.tertiary,
    textAlign: "center",
    fontFamily: "Roboto_900Black",
  },
  button_wrapper: { width: "120%" },
  button_container: {
    width: "100%",
    paddingVertical: 4,
  },
  button: { alignItems: "center" },
  button_text: {
    color: theme.colors.tertiary,
    fontWeight: "bold",
    fontSize: 24,
    padding: 2,
  },
});

export default LoginScreen;
