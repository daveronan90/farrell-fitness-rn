import { AuthResponse } from "@supabase/supabase-js";
import { Dispatch, SetStateAction, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { supabase } from "../supabase";
import theme from "../theme";

interface ISignUpForm {
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ setVisibility }: ISignUpForm) => {
  const [fName, setFName] = useState("");
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const { error }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: uName,
          full_name: fName,
        },
      },
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      Alert.alert("Sign up successful, Welcome!\nYou can now login!");
      setVisibility(false);
    }
  };
  return (
    <>
      <TextInput
        value={fName}
        onChangeText={(text) => setFName(text)}
        mode="outlined"
        label="Full Name"
        style={styles.input}
      />
      <TextInput
        value={uName}
        onChangeText={(text) => setUName(text)}
        mode="outlined"
        label="Username"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        label="Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        label="Password"
        style={[{ marginBottom: 24 }, styles.input]}
      />
      <Button mode="outlined" uppercase onPress={() => signUp()}>
        Register
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    color: theme.colors.tertiary,
    width: "70%",
    marginTop: 24,
  },
});

export default SignUpForm;
