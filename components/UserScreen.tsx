import { useIsFocused } from "@react-navigation/native";
import { PostgrestResponse, Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import Dots from "../assets/Dots.svg";
import { supabase } from "../supabase";
import theme from "../theme";
import EventsList from "./EventsList";
import { IAttending, IEvent } from "./EventsScreen";

export interface IUser {
  username: string;
  full_name: string;
  id: string;
  email: string;
}

export interface IBookedEvent extends IEvent {
  id: string;
  endTimestamp: string;
  size: number;
  startTimestamp: string;
  title: string;
}

interface IUserScreenProps {
  session: Session;
}

const UserScreen = ({ session }: IUserScreenProps) => {
  const getUserInfo = async () => {
    const { data, error }: PostgrestResponse<IUser> = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id);
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const getBookedEvents = async () => {
    const { data, error }: PostgrestResponse<IBookedEvent> = await supabase
      .from("events")
      .select(`*, attendances!inner(*)`);
    if (error) {
      console.log(error);
    } else {
      const filteredArray = [...data].filter(
        (event) =>
          parseInt(event.startTimestamp.substring(8, 10)) >=
            new Date().getDate() &&
          event.attendances.findIndex(
            (userEvent: IAttending) => userEvent.user_id === session.user.id
          ) !== -1
      );
      return [...filteredArray];
    }
  };

  const isFocused = useIsFocused();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
  });

  const { data: bookedEvents } = useQuery({
    queryKey: ["bookedEvents", isFocused],
    queryFn: getBookedEvents,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dots_bottom}>
        <Dots />
      </View>
      <View style={styles.dots_top}>
        <Dots />
      </View>
      <View style={styles.avatar_container}>
        <Avatar.Image size={80} source={require(`../assets/avatar.webp`)} />
        <View style={styles.notification_container}>
          <Text variant="labelSmall" style={styles.notification_text}>
            2
          </Text>
        </View>
      </View>
      {user ? (
        <Text variant="headlineMedium" style={styles.fullname_text}>
          {user[0]?.full_name}
        </Text>
      ) : null}
      {user ? <Text style={styles.email_text}>{user[0]?.email}</Text> : null}
      <Text>{session.user.email}</Text>
      <Button
        mode="contained"
        onPress={() => {
          supabase.auth.signOut();
        }}
        style={{ marginBottom: 24 }}
      >
        Log out
      </Button>
      <Text variant="headlineMedium" style={styles.booked_header}>
        Booked Classes
      </Text>
      <EventsList
        eventsList={
          bookedEvents || [
            {
              id: "",
              title: "",
              created_at: "",
              created_by: "",
              endTimestamp: "",
              size: 0,
              startTimestamp: "",
              attendances: [{ user_id: "", event_id: "" }],
            },
          ]
        }
        booked={true}
        session={session}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: theme.colors.secondary,
    height: "100%",
    paddingVertical: 48,
    alignItems: "center",
  },
  dots_bottom: { position: "absolute", bottom: 0, left: 0 },
  dots_top: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [{ rotateY: "180deg" }, { rotateX: "180deg" }],
  },
  avatar_container: { position: "relative" },
  notification_container: {
    position: "absolute",
    backgroundColor: theme.colors.info,
    width: 20,
    height: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  notification_text: { color: theme.colors.tertiary, fontWeight: "bold" },
  fullname_text: { color: theme.colors.tertiary, fontWeight: "bold" },
  email_text: { color: "gray" },
  booked_header: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.tertiary,
    width: "100%",
    textAlign: "center",
    paddingVertical: 4,
    fontWeight: "bold",
    marginBottom: 24,
  },
});

export default UserScreen;
