const AsyncStorage = require("@react-native-async-storage/async-storage");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://halmrruvcfzrgrmysmov.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbG1ycnV2Y2Z6cmdybXlzbW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1NDIyNDcsImV4cCI6MTk4ODExODI0N30.UVrazsaEtqfLVPVeuV88WHDH43V1s1DkdQuqYncARi8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const getEventsForUser = async () => {
  const { data, error } = await supabase
    .from("events")
    .select(`*, attendances!inner(*)`);
  if (error) console.error(error);
  console.log(data);
};

getEventsForUser();
