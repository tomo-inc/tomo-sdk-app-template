"use client";
import { useCallback, useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useTomo } from "@tomo-inc/tomo-web-sdk";


function useWallet() {
  const [solBalance, setSolBalance] = useState<string>("");
  const { providers, walletState, openConnectModal, connected, disconnect: disconnectTomo } = useTomo();
  const { solanaProvider } = providers;
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (solanaProvider) {
      const customRpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";
      solanaProvider.endpoint = customRpcUrl;
      if (solanaProvider.connection) {
        try {
          solanaProvider.connection = new Connection(customRpcUrl, "confirmed");
        } catch (error) {
          console.warn("Error", error);
        }
      }
    }
  }, [solanaProvider]);
  const updateBalance = useCallback(async () => {
    if (!walletState.solanaAddress || !connected) return;
    try {
      const publicKey = new PublicKey(walletState.solanaAddress);
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      const lamports = await connection.getBalance(publicKey);
      if (solanaProvider) {
        console.log("solanaProvider", solanaProvider);
      }
      // Format balance with full precision
      const solBalance = (lamports / LAMPORTS_PER_SOL).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2, // Solana can have up to 9 decimal places
        useGrouping: true,
      });
      setSolBalance(solBalance);
    } catch (error) {
      console.error("Failed to fetch devnet balance:", error);
    }
  }, [walletState.solanaAddress, connected]);
  // Auto-update balance
  useEffect(() => {
    if (connected && walletState.solanaAddress) {
      // alert("connected " + connected + walletState.solanaAddress);
      updateBalance();
      const interval = setInterval(() => {
        updateBalance();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [connected, walletState.solanaAddress]);
  const connect = async () => {
    openConnectModal();
  };
  const disconnect = async () => {
    try {
      if (connected) {
        await disconnectTomo();
        setSolBalance("");
        // toast.success("Wallet disconnected");
      }
    } catch (error) {
      console.error("Disconnect error:", error);
      // toast.error("Failed to disconnect");
    }
  };
  return {
    ...walletState,
    solBalance,
    connected,
    connect,
    disconnect,
    // updateBalance,
  };
}

export default function App() {
  const { connected, connect, disconnect, solBalance, solanaAddress } = useWallet();
  return (
    <>
      <h1>test</h1>
      <h2>balance: {String(solBalance)}</h2>
      <h2>connected: {String(connected)}</h2>
      <h2>solanaAddress: {solanaAddress}</h2>
    </>
  );
}
