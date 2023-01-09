import { Session } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";
import theme from "../theme";
import BookEvent from "./BookEvent";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface IFFModalProps {
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  eventId?: string;
  eventSize?: number;
  session?: Session;
  booked?: boolean;
  formType?: string;
}

const FFModal = ({
  visibility,
  setVisibility,
  eventId,
  eventSize,
  session,
  booked,
  formType,
}: IFFModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visibility}
        onDismiss={() => setVisibility(false)}
        contentContainerStyle={[
          {
            backgroundColor: eventId
              ? theme.colors.secondary
              : theme.colors.tertiary,
          },
          styles.container,
        ]}
      >
        {eventId ? (
          <BookEvent
            eventId={eventId}
            eventSize={eventSize}
            session={session}
            booked={booked}
            setVisibility={setVisibility}
          />
        ) : formType === "signUp" ? (
          <SignUpForm setVisibility={setVisibility} />
        ) : (
          <LoginForm />
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FFModal;
