import { getDefaultConfig } from "@tomo-inc/tomo-evm-kit";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "TomoEvmKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
  clientId: 'bCMfq7lAMPobDhf6kWAHAPtO5Ct6YuA77W9SzhjUixFwOOi0f92vsdJpkAhn0W4tg8TVSeTNUSvBOC3MXYRuIH0Z'
});
