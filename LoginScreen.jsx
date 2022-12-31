import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from "react-native";
import {
  Button,
  MD3LightTheme as DefaultTheme,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import Logo from "./assets/Logo.svg";
import Dots from "./assets/Dots.svg";
import { auth, signIn } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth/react-native";

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

const LoginScreen = ({ setUser, user }) => {
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (!user) setUser(null);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dotsBtm}>
        <Dots />
      </View>
      <View style={styles.dotsTop}>
        <Dots />
      </View>
      <Logo width={327} height={218} />
      <View>
        <Text variant="displayMedium" style={styles.heading}>
          Farrell Fitness
        </Text>
        <Text variant="displaySmall" style={styles.heading}>
          Gym & Performance Center
        </Text>
      </View>
      <View style={styles.btn_container}>
        <Button
          style={styles.btn}
          mode="contained"
          uppercase
          onPress={() => setVisibility(true)}
        >
          Login
        </Button>
      </View>
      <Portal>
        <Modal
          visible={visibility}
          onDismiss={() => setVisibility(false)}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: theme.colors.tertiary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            label="Email"
            style={{
              color: theme.colors.tertiary,
              width: "70%",
              marginTop: 24,
            }}
          />
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            mode="outlined"
            label="Password"
            style={{
              color: theme.colors.tertiary,
              width: "70%",
              marginTop: 8,
              marginBottom: 24,
            }}
          />
          <Button style={{ marginBottom: 24 }}>Forgot Password</Button>
          <Button
            mode="outlined"
            uppercase
            onPress={async () => {
              const userObj = await signIn(email, password);
              setEmail("");
              setPassword("");
              setUser(userObj);
            }}
          >
            Login
          </Button>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    position: "relative",
    flex: 1,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 104,
    paddingHorizontal: 24,
    fontFamily: "Roboto_400Regular",
  },
  dotsBtm: { position: "absolute", bottom: 0, left: 0 },
  dotsTop: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
  },
  heading: {
    color: theme.colors.tertiary,
    textAlign: "center",
    fontFamily: "Roboto_900Black",
  },
  btn: { minWidth: 110 },
  btn_container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoginScreen;
