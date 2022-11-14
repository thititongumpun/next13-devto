import React from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <SessionProvider session={pageProps.session}>
            <CSSReset />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </SessionProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
