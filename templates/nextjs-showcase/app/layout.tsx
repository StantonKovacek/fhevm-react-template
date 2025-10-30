"use client";

import { FhevmProvider } from "@fhevm-toolkit/sdk/react";
import "./globals.css";

const fhevmConfig = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || "https://gateway.zama.ai",
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS || "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS || "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FHEVM SDK Showcase</title>
        <meta name="description" content="Next.js showcase for FHEVM SDK integration patterns" />
      </head>
      <body>
        <FhevmProvider config={fhevmConfig}>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🔐</div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900">
                        FHEVM SDK Showcase
                      </h1>
                      <p className="text-xs text-gray-500">
                        Next.js 14 + FHEVM Integration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <main>
              {children}
            </main>
            <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-sm text-gray-600">
                  Built with @fhevm-toolkit/sdk | Privacy-preserving encryption with FHE
                </p>
              </div>
            </footer>
          </div>
        </FhevmProvider>
      </body>
    </html>
  );
}
