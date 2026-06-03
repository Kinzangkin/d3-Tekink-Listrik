import { createClient } from "@supabase/supabase-js"

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""

// Ensure we only use the configured URL if it is a valid HTTP/HTTPS URL
// to prevent build crashes caused by invalid/missing environment variables
const supabaseUrl = (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
  ? rawUrl
  : "https://placeholder-project.supabase.co"

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
