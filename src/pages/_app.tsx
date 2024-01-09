import "@/styles/globals.css";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import NavBar from "@/components/NavBar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

// Create a client
const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Component {...pageProps} />
        </QueryClientProvider>
      </TooltipProvider>
    </SessionContextProvider>
  );
}
