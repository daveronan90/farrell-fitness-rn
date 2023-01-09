import { Session } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import Logo from "../assets/Logo.svg";
import { supabase } from "../supabase";

interface IBookEvent {
  eventId: string;
  eventSize?: number;
  session?: Session;
  booked?: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}

const BookEvent = ({
  eventId,
  eventSize,
  booked,
  session,
  setVisibility,
}: IBookEvent) => {
  const queryClient = useQueryClient();

  const updateAvailableSpaces = useMutation(
    async ({ id, size }: { id: string; size: number }) => {
      const { error: aError } = await supabase
        .from("attendances")
        .insert({ user_id: session?.user.id, event_id: id });
      if (aError) {
        console.log(aError);
      } else {
        if (size >= 0) {
          const { error: eError } = await supabase
            .from("events")
            .update({ size: size - 1 })
            .eq("id", id);
          if (eError) console.log(eError);
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["events"]);
      },
      onError: (error) => console.log(error),
    }
  );

  const unBookEvent = useMutation(
    async ({ id, size }: { id: string; size: number }) => {
      const { error: dError } = await supabase
        .from("attendances")
        .delete()
        .eq("event_id", id);
      if (dError) {
        console.log(dError);
      } else {
        if (size >= 0) {
          const { error: eError } = await supabase
            .from("events")
            .update({ size: size + 1 })
            .eq("id", id);
          if (eError) console.log(eError);
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(["bookedEvents"]);
      },
      onError: (error) => console.log(error),
    }
  );

  const handleOnPress = (id: string, size = 0) => {
    if (booked) {
      unBookEvent.mutate({ id, size });
    } else {
      updateAvailableSpaces.mutate({ id, size });
    }
    setVisibility(false);
  };

  return (
    <View style={styles.constainer}>
      <Logo width={330} height={220} />
      <View style={styles.button_container}>
        <Button
          mode="outlined"
          onPress={() => handleOnPress(eventId, eventSize)}
        >
          Confirm
        </Button>
        <Button mode="outlined" onPress={() => setVisibility(false)}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    alignItems: "center",
    height: "50%",
    justifyContent: "space-evenly",
  },
  button_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});

export default BookEvent;
