import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase.types";

export const supabaseServer =  new SupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY as string,
   
  )