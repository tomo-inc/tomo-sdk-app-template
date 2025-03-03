import "@tomo-inc/tomo-evm-kit/styles.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TomoEVMKitProvider } from "@tomo-inc/tomo-evm-kit";
import { WagmiProvider } from "wagmi";

import { config } from "../wagmi";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <TomoEVMKitProvider>
          <Component {...pageProps} />
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
