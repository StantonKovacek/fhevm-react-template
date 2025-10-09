"use client";

import { useState } from "react";
import { useDecrypt, useFhevmClient } from "@fhevm-toolkit/sdk/react";
import Link from "next/link";

export default function DecryptPage() {
  const { isInitialized } = useFhevmClient();
  const { userDecrypt, publicDecrypt } = useDecrypt();

  const [decryptionType, setDecryptionType] = useState<"user" | "public">("user");
  const [contractAddress, setContractAddress] = useState("");
  const [handleInput, setHandleInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState("");

  const handleDecrypt = async () => {
    if (!isInitialized) {
      setError("FHEVM is not initialized yet");
      return;
    }

    if (!contractAddress) {
      setError("Please enter a contract address");
      return;
    }

    if (!handleInput) {
      setError("Please enter an encrypted handle");
      return;
    }

    setError("");
    setIsDecrypting(true);
    setResult(null);

    try {
      const handle = BigInt(handleInput);
      let decryptedValue: bigint;

      if (decryptionType === "user") {
        decryptedValue = await userDecrypt(contractAddress, handle);
      } else {
        decryptedValue = await publicDecrypt(contractAddress, handle);
      }

      setResult(decryptedValue.toString());
    } catch (err: any) {
      setError(err.message || "Decryption failed");
    } finally {
      setIsDecrypting(false);
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
        <div className="text-6xl mb-4">🔓</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Decryption Demo
        </h1>
        <p className="text-lg text-gray-600">
          Decrypt FHE-encrypted data using user or public decryption
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

        {/* Decryption Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Decryption Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setDecryptionType("user");
                setResult(null);
                setError("");
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                decryptionType === "user"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-gray-900 flex items-center justify-center mb-2">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                User Decrypt
              </div>
              <div className="text-xs text-gray-500">
                Requires wallet signature (EIP-712)
              </div>
            </button>

            <button
              onClick={() => {
                setDecryptionType("public");
                setResult(null);
                setError("");
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                decryptionType === "public"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold text-gray-900 flex items-center justify-center mb-2">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Public Decrypt
              </div>
              <div className="text-xs text-gray-500">
                No signature required
              </div>
            </button>
          </div>
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
            The contract that owns the encrypted data
          </p>
        </div>

        {/* Encrypted Handle */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encrypted Handle
          </label>
          <input
            type="text"
            value={handleInput}
            onChange={(e) => setHandleInput(e.target.value)}
            placeholder="e.g., 123456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          />
          <p className="mt-2 text-sm text-gray-500">
            The encrypted handle returned from encryption or contract
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-yellow-800">
              <strong>
                {decryptionType === "user" ? "User Decrypt:" : "Public Decrypt:"}
              </strong>{" "}
              {decryptionType === "user"
                ? "Requires EIP-712 signature from your wallet. Only authorized users can decrypt."
                : "Does not require signature. Anyone can decrypt publicly available data."}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          disabled={isDecrypting || !isInitialized}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isDecrypting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Decrypting...
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
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              Decrypt Data
            </>
          )}
        </button>

        {/* Result */}
        {result !== null && (
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
              Decryption Successful
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decrypted Value
              </label>
              <div className="p-4 bg-white rounded border border-green-300">
                <div className="text-2xl font-mono font-bold text-gray-900">
                  {result}
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-gray-700">
                <strong>Success!</strong> The encrypted data has been decrypted using{" "}
                {decryptionType === "user" ? "user" : "public"} decryption.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          User vs Public Decryption
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Feature
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  User Decrypt
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Public Decrypt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  Signature Required
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  ✅ Yes (EIP-712)
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">❌ No</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  Access Control
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Permission-based
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Publicly accessible
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  Use Case
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Private data (balances, votes)
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Public results (winners, totals)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  Gas Cost
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Higher</td>
                <td className="py-3 px-4 text-sm text-gray-600">Lower</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  Security
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  High (user-specific)
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  Medium (anyone can view)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          How Decryption Works
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            FHEVM provides two decryption methods depending on your privacy requirements:
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                1
              </div>
              <div>
                <strong>User Decrypt:</strong> Requires an EIP-712 signature from the
                user's wallet. The contract checks if the user has permission to decrypt
                the data. Perfect for sensitive information like balances or personal
                votes.
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                2
              </div>
              <div>
                <strong>Public Decrypt:</strong> No signature required. Anyone can
                decrypt data that the contract has made publicly available. Ideal for
                revealing final results after a voting period or auction ends.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
