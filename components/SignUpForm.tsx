import { yupResolver } from "@hookform/resolvers/yup";
import { AuthResponse } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as yup from "yup";
import { supabase } from "../supabase";
import theme from "../theme";

const schema = yup.object({
  fullName: yup.string().required(),
  userName: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required(),
});

interface ISignUpFormProps {
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

interface IFormInputs {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

const SignUpForm = ({ setVisibility }: ISignUpFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      fullName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async ({
    email,
    password,
    fullName,
    userName,
  }) => {
    const { error }: AuthResponse = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, username: userName } },
    });
    if (error) {
      return Alert.alert(error.message);
    } else {
      setVisibility(false);
      Alert.alert(
        "Welcome to Farrell Fitness",
        "Thanks for Registering,\nPlease verify your email and you can login!"
      );
    }
  };

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            mode="outlined"
            label="Full Name"
            style={styles.input}
          />
        )}
        name="fullName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            mode="outlined"
            label="Username"
            style={styles.input}
          />
        )}
        name="userName"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            mode="outlined"
            label="Email"
            style={styles.input}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            mode="outlined"
            label="password"
            style={[{ marginBottom: 24 }, styles.input]}
            secureTextEntry
          />
        )}
        name="password"
      />
      <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
        Register
      </Button>
      {errors.userName && <Text>Username is required</Text>}
      {errors.fullName && <Text>Full Name is required</Text>}
      {errors.email && <Text>Email is incorrect or missing</Text>}
      {errors.password && <Text>Password is required</Text>}
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
