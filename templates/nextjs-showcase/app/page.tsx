"use client";

import { useEffect, useState } from "react";
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";
import Link from "next/link";

export default function HomePage() {
  const { initialize, isInitialized } = useFhevmClient();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          await initialize(provider);
        } catch (error) {
          console.error("Failed to initialize FHEVM:", error);
        }
      }
    };
    init();
  }, [initialize]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          FHEVM SDK Showcase
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore Fully Homomorphic Encryption patterns with Next.js 14
        </p>

        {/* Status Indicators */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isInitialized ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <span className="text-sm text-gray-700">
              FHEVM: {isInitialized ? "Ready" : "Initializing..."}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-gray-300"
              }`}
            />
            <span className="text-sm text-gray-700">
              Wallet: {isConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
        </div>

        {/* Wallet Connection */}
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
            <span className="font-mono text-sm">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Encryption Demo */}
        <Link
          href="/encrypt"
          className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Encryption Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Encrypt different data types (uint32, uint64, bool) using FHE
          </p>
          <div className="text-blue-600 font-medium flex items-center">
            Try it
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>

        {/* Decryption Demo */}
        <Link
          href="/decrypt"
          className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
        >
          <div className="text-4xl mb-4">🔓</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Decryption Demo
          </h3>
          <p className="text-gray-600 mb-4">
            Learn about user decrypt vs public decrypt with EIP-712 signatures
          </p>
          <div className="text-blue-600 font-medium flex items-center">
            Try it
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>

        {/* SDK Patterns */}
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            SDK Patterns
          </h3>
          <p className="text-gray-600 mb-4">
            Framework-agnostic core with React hooks for easy integration
          </p>
          <div className="text-gray-500 font-medium">Documentation</div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                FhevmProvider Setup
              </h3>
              <p className="text-sm text-gray-600">
                Global provider with configuration for gateway, ACL, and KMS
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Multiple Encryption Types
              </h3>
              <p className="text-sm text-gray-600">
                Support for uint8, uint16, uint32, uint64, and boolean
                encryption
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Wagmi-like API
              </h3>
              <p className="text-sm text-gray-600">
                Familiar hook patterns: useEncrypt, useDecrypt, useFhevmClient
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                TypeScript Support
              </h3>
              <p className="text-sm text-gray-600">
                Full TypeScript definitions for type safety and autocomplete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Getting Started
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Install SDK</h3>
              <code className="text-sm bg-white px-3 py-1 rounded mt-1 inline-block">
                npm install @fhevm-toolkit/sdk
              </code>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Wrap with FhevmProvider
              </h3>
              <code className="text-sm bg-white px-3 py-1 rounded mt-1 inline-block">
                &lt;FhevmProvider config={"{...}"}&gt;...&lt;/FhevmProvider&gt;
              </code>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Use hooks</h3>
              <code className="text-sm bg-white px-3 py-1 rounded mt-1 inline-block">
                const {"{ encryptU64 }"} = useEncrypt()
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
