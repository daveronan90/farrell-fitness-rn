import { useIsFocused } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View
} from "react-native";
import { Text } from "react-native-paper";
import Dots from "../assets/Dots.svg";
import Logo from "../assets/Logo.svg";
import { supabase } from "../supabase";
import theme from "../theme";
import EventsList from "./EventsList";

export interface IAttending {
  user_id: string;
  event_id: string;
}

export interface IEvent {
  id: string;
  startTimestamp: string;
  title: string;
  size: number;
  endTimestamp: string;
  created_at: string;
  created_by: string;
  attendances: IAttending[];
}

interface IEventsScreenProps {
  session: Session;
}

const EventsScreen = ({ session }: IEventsScreenProps) => {
  const [dayOfWeek, setDayOfWeek] = useState<number>(new Date().getDate());
  const isFocused = useIsFocused();

  const getEventsInfo = async () => {
    const { data, error } = await supabase
      .from("events")
      .select(`*, attendances!left(*)`);
    if (error) {
      console.log(error);
    } else {
      const filteredEvents = data.filter(
        (event: IEvent) =>
          parseInt(event.startTimestamp.substring(8, 10)) >=
          new Date().getDate()
      );
      return filteredEvents;
    }
  };

  const { data: events } = useQuery({
    queryKey: ["events", isFocused],
    queryFn: getEventsInfo,
  });

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeekNumber = date.getDay();
    const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const dayOfWeek = dayNames[dayOfWeekNumber];

    return dayOfWeek;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dots_bottom}>
        <Dots />
      </View>
      <View style={styles.dots_top}>
        <Dots />
      </View>
      <Logo width={150} height={50} />
      {events && (
        <View style={styles.dates_container}>
          {events &&
            [
              ...new Set(
                events.map((event: IEvent) =>
                  event.startTimestamp.substring(0, 10)
                )
              ),
            ]
              .sort(
                (a, b) =>
                  parseInt(a.substring(8, 10)) - parseInt(b.substring(8, 10))
              )
              .slice(0, 6)
              .map((date, idx) => (
                <Pressable
                  key={idx}
                  style={[
                    {
                      backgroundColor:
                        dayOfWeek === parseInt(date.substring(8, 10))
                          ? theme.colors.primary
                          : undefined,
                    },
                    styles.date_button,
                  ]}
                  onPress={() => setDayOfWeek(parseInt(date.substring(8, 10)))}
                >
                  <Text
                    variant={
                      dayOfWeek === parseInt(date.substring(8, 10))
                        ? "bodyMedium"
                        : "bodySmall"
                    }
                    style={[
                      {
                        fontWeight:
                          dayOfWeek === parseInt(date.substring(8, 10))
                            ? "bold"
                            : undefined,
                      },
                      ,
                      styles.date_text,
                    ]}
                  >
                    {date.substring(8, 10)}
                  </Text>
                  <Text
                    variant={
                      dayOfWeek === parseInt(date.substring(8, 10))
                        ? "bodyMedium"
                        : "bodySmall"
                    }
                    style={[
                      {
                        fontWeight:
                          dayOfWeek === parseInt(date.substring(8, 10))
                            ? "bold"
                            : undefined,
                      },
                      styles.date_text,
                    ]}
                  >
                    {getDayOfWeek(date.substring(0, 10))}
                  </Text>
                </Pressable>
              ))}
        </View>
      )}
      <EventsList
        eventsList={
          events
            ? events.filter(
                (event: IEvent) =>
                  parseInt(event.startTimestamp.substring(8, 10)) === dayOfWeek
              )
            : [
                {
                  id: "",
                  startTimestamp: "",
                  title: "",
                  size: "",
                  endTimestamp: "",
                  created_at: "",
                  created_by: "",
                },
              ]
        }
        booked={false}
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
  dates_container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  date_button: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  date_text: { color: theme.colors.tertiary },
});

export default EventsScreen;
