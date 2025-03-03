import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@tomo-inc/tomo-web-sdk/style.css";
import { TomoContextProvider } from "@tomo-inc/tomo-web-sdk";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TomoContextProvider
      clientId={
        "yiPWTD4fztgEVS78HDUHoSFb4geppl2XTrhHZQUdGnh981bE13m2jrEwBhMlKNUNRWSoCYwD4ruOhWStuunYxMF0"
      }
      chainTypes={["solana"]}
    ><Component {...pageProps} />
    </TomoContextProvider>);
}
