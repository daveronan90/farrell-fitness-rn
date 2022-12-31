import React from "react";
import { signOut } from "firebase/auth/react-native";
import { View } from "react-native";
import { auth, db } from "./firebaseConfig";
import { Button, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

const fetchUser = async (userId) => {
  const docSnap = await getDoc(doc(db, "users", userId));

  if (docSnap.exists()) return docSnap.data();
  return "User doesn't exist";
};

const UserScreen = ({ user }) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(user.uid),
  });

  const { firstName, lastName, username, email, createdAt } = data;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error: {error.message}</Text>
      ) : (
        <>
          <Text>{`${firstName[0].toUpperCase() + firstName.substr(1)} ${
            lastName[0].toUpperCase() + lastName.substr(1)
          }`}</Text>
          <Text>{email}</Text>
          <Text>{username}</Text>
          <Text>{createdAt.toDate().toDateString()}</Text>
          <Button
            mode="contained"
            onPress={() => {
              signOut(auth);
            }}
          >
            Log out
          </Button>
        </>
      )}
    </View>
  );
};

export default UserScreen;
