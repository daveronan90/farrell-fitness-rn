import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://halmrruvcfzrgrmysmov.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhbG1ycnV2Y2Z6cmdybXlzbW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1NDIyNDcsImV4cCI6MTk4ODExODI0N30.UVrazsaEtqfLVPVeuV88WHDH43V1s1DkdQuqYncARi8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
