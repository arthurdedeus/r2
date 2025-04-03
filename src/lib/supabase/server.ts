import { createClient as baseCreateClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { auth } from "@clerk/nextjs/server";

export async function createClient(
  key: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
) {
  return baseCreateClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    },
  );
}
