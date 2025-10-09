"use client";

import { useState } from "react";
import { useEncrypt, useFhevmClient } from "@fhevm-toolkit/sdk/react";
import Link from "next/link";

export default function EncryptPage() {
  const { isInitialized } = useFhevmClient();
  const { encryptU32, encryptU64, encryptBool } = useEncrypt();

  const [encryptionType, setEncryptionType] = useState<"uint32" | "uint64" | "bool">("uint32");
  const [inputValue, setInputValue] = useState("");
  const [contractAddress, setContractAddress] = useState("0x0000000000000000000000000000000000000000");
  const [result, setResult] = useState<any>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState("");

  const handleEncrypt = async () => {
    if (!isInitialized) {
      setError("FHEVM is not initialized yet");
      return;
    }

    if (!inputValue) {
      setError("Please enter a value");
      return;
    }

    if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
      setError("Please enter a valid contract address");
      return;
    }

    setError("");
    setIsEncrypting(true);
    setResult(null);

    try {
      let encrypted;

      if (encryptionType === "uint32") {
        const value = parseInt(inputValue);
        if (isNaN(value) || value < 0 || value > 4294967295) {
          throw new Error("Invalid uint32 value (0 to 4,294,967,295)");
        }
        encrypted = await encryptU32(value, contractAddress);
      } else if (encryptionType === "uint64") {
        const value = BigInt(inputValue);
        if (value < 0n) {
          throw new Error("Invalid uint64 value (must be positive)");
        }
        encrypted = await encryptU64(value, contractAddress);
      } else {
        const value = inputValue.toLowerCase() === "true";
        encrypted = await encryptBool(value, contractAddress);
      }

      setResult(encrypted);
    } catch (err: any) {
      setError(err.message || "Encryption failed");
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </Link>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🔐</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Encryption Demo
        </h1>
        <p className="text-lg text-gray-600">
          Encrypt data using Fully Homomorphic Encryption (FHE)
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {/* FHEVM Status */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                isInitialized ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <span className="text-sm font-medium text-gray-900">
              FHEVM Status: {isInitialized ? "✅ Ready" : "⏳ Initializing..."}
            </span>
          </div>
        </div>

        {/* Encryption Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Encryption Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => {
                setEncryptionType("uint32");
                setInputValue("");
                setResult(null);
                setError("");
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                encryptionType === "uint32"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-gray-900">uint32</div>
              <div className="text-xs text-gray-500 mt-1">
                0 to 4.2B
              </div>
            </button>

            <button
              onClick={() => {
                setEncryptionType("uint64");
                setInputValue("");
                setResult(null);
                setError("");
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                encryptionType === "uint64"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-gray-900">uint64</div>
              <div className="text-xs text-gray-500 mt-1">
                Large numbers
              </div>
            </button>

            <button
              onClick={() => {
                setEncryptionType("bool");
                setInputValue("");
                setResult(null);
                setError("");
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                encryptionType === "bool"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-gray-900">bool</div>
              <div className="text-xs text-gray-500 mt-1">
                true/false
              </div>
            </button>
          </div>
        </div>

        {/* Input Value */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value to Encrypt
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              encryptionType === "bool"
                ? "true or false"
                : encryptionType === "uint32"
                ? "e.g., 12345"
                : "e.g., 9876543210"
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500">
            {encryptionType === "uint32" && "Enter a number between 0 and 4,294,967,295"}
            {encryptionType === "uint64" && "Enter any positive integer"}
            {encryptionType === "bool" && "Enter 'true' or 'false'"}
          </p>
        </div>

        {/* Contract Address */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <p className="mt-2 text-sm text-gray-500">
            The contract address that will use this encrypted value
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Encrypt Button */}
        <button
          onClick={handleEncrypt}
          disabled={isEncrypting || !isInitialized}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isEncrypting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Encrypting...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Encrypt Data
            </>
          )}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Encryption Successful
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Encrypted Handle
                </label>
                <div className="p-3 bg-white rounded border border-green-300 font-mono text-sm break-all">
                  {result.handles && result.handles.length > 0
                    ? result.handles[0].toString()
                    : "N/A"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input Proof (First 100 chars)
                </label>
                <div className="p-3 bg-white rounded border border-green-300 font-mono text-xs break-all">
                  {result.inputProof
                    ? result.inputProof.slice(0, 100) + "..."
                    : "N/A"}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-gray-700">
                <strong>Next steps:</strong> Use the encrypted handle in your smart
                contract function call, passing the inputProof as required.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Encryption Works
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            When you encrypt data with FHEVM, you're converting plaintext values into
            encrypted handles that can be used in smart contracts.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Handle:</strong> A unique identifier for your encrypted value
            </li>
            <li>
              <strong>Input Proof:</strong> Cryptographic proof that you encrypted the
              data correctly
            </li>
            <li>
              <strong>Contract Address:</strong> Ensures the encryption is bound to a
              specific contract
            </li>
          </ul>
          <p className="mt-4 text-sm">
            The encrypted data can be used in computations without ever being decrypted,
            preserving privacy throughout the entire process.
          </p>
        </div>
      </div>
    </div>
  );
}
