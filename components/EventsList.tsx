import { Session } from "@supabase/supabase-js";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import theme from "../theme";
import { IEvent } from "./EventsScreen";
import FFModal from "./FFModal";

interface IEventsListProps {
  eventsList: IEvent[];
  booked: boolean;
  session: Session;
}

const EventsList = ({ eventsList, booked, session }: IEventsListProps) => {
  const [visibility, setVisibility] = useState(false);
  const [eventId, setEventId] = useState("");
  const [eventSize, setEventSize] = useState(0);
  const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);

  const sortedItems = useMemo(() => {
    if (eventsList) {
      return eventsList.sort(
        (a, b) =>
          parseInt(a.startTimestamp.substring(11, 13)) -
          parseInt(b.startTimestamp.substring(11, 13))
      );
    }
  }, [eventsList]);

  return (
    <>
      <FlatList
        style={styles.flatlist}
        data={sortedItems}
        renderItem={({
          item: {
            endTimestamp,
            startTimestamp,
            title,
            size,
            id,
            attendances = [],
          },
        }) => (
          <Pressable
            onPress={() => {
              setEventId(id);
              setEventSize(size);
              setVisibility(true);
            }}
            style={styles.event_container}
            disabled={
              (!booked && size === 0) ||
              (!booked &&
              -1 !==
                attendances.findIndex(
                  (userEvent) => userEvent.user_id === session.user.id
                ) &&
              attendances
                ? attendances.length > 0
                : false)
            }
            android_ripple={{
              color: theme.colors.primary,
            }}
          >
            <View>
              <Text style={styles.event_time}>{`${startTimestamp.substring(
                11,
                16
              )} - ${endTimestamp.substring(11, 16)}`}</Text>
              <Text style={styles.event_title}>{title}</Text>
            </View>
            <View>
              <Text style={styles.event_spaces}>
                {booked
                  ? startTimestamp.substring(0, 10)
                  : `${size} available spaces`}
              </Text>
              {(!booked && size === 0) ||
              (!booked &&
              -1 !==
                attendances.findIndex(
                  (userEvent) => userEvent.user_id === session.user.id
                ) &&
              attendances
                ? attendances.length > 0
                : false) ? (
                <Text style={styles.event_booked}>BOOKED</Text>
              ) : null}
            </View>
          </Pressable>
        )}
        keyExtractor={() => keyGenerator()}
      />
      <FFModal
        visibility={visibility}
        setVisibility={setVisibility}
        eventId={eventId}
        eventSize={eventSize}
        session={session}
        booked={booked}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: { width: "100%" },
  event_container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.secondary,
    justifyContent: "space-between",
    margin: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 8,
  },
  event_title: { color: theme.colors.tertiary },
  event_time: {
    color: theme.colors.tertiary,
    alignItems: "flex-start",
    marginBottom: 4,
  },
  event_spaces: { color: theme.colors.tertiary, marginBottom: 4 },
  event_booked: {
    color: theme.colors.primary,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
});

export default EventsList;
