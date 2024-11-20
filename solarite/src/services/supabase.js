import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hyvampzzpvxqxlxukrza.supabase.co";
const SERVICE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dmFtcHp6cHZ4cXhseHVrcnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwNTA0OTgsImV4cCI6MjA0NzYyNjQ5OH0.vblxAtNFKdqzZvHfqnGu2sO-eZZabCxeCyLpwdQvSWo";
export const supabase = createClient(SUPABASE_URL, SERVICE_KEY);