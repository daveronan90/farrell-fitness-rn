import { AuthResponse } from "@supabase/supabase-js";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { supabase } from "../supabase";
import theme from "../theme";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async () => {
    const { error }: AuthResponse = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        label="Email"
        style={styles.email_input}
      />
      <TextInput
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        label="Password"
        style={styles.password_input}
      />
      <Button style={styles.forgot_password_button}>Forgot Password</Button>
      <Button mode="outlined" uppercase onPress={() => loginWithEmail()}>
        Login
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  email_input: {
    color: theme.colors.tertiary,
    width: "70%",
    marginTop: 24,
  },
  password_input: {
    color: theme.colors.tertiary,
    width: "70%",
    marginTop: 8,
    marginBottom: 24,
  },
  forgot_password_button: { marginBottom: 24 },
});

export default LoginForm;
