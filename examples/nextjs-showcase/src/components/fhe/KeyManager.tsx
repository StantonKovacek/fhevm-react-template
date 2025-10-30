"use client";

/**
 * Key management component
 */

import React, { useState } from 'react';
import { useFhevmClient } from '@fhevm-toolkit/sdk/react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const KeyManager: React.FC = () => {
  const { isInitialized } = useFhevmClient();
  const [showKeys, setShowKeys] = useState(false);

  return (
    <Card title="Key Management" padding="lg">
      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-gray-900">FHE Client Status</h4>
            <p className="text-sm text-gray-600">
              {isInitialized ? 'Initialized and ready' : 'Not initialized'}
            </p>
          </div>
          <div
            className={`w-3 h-3 rounded-full ${
              isInitialized ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        </div>

        {/* Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">About FHE Keys</h4>
          <p className="text-sm text-blue-800">
            FHE keys are automatically managed by the SDK. Public keys are used for
            encryption, while the KMS (Key Management System) handles decryption
            operations securely.
          </p>
        </div>

        {/* Key Display Toggle */}
        <div className="space-y-3">
          <Button
            onClick={() => setShowKeys(!showKeys)}
            variant="outline"
            className="w-full"
          >
            {showKeys ? 'Hide' : 'Show'} Key Information
          </Button>

          {showKeys && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Gateway URL:</span>
                  <p className="font-mono text-xs mt-1 break-all">
                    {process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">ACL Address:</span>
                  <p className="font-mono text-xs mt-1">
                    {process.env.NEXT_PUBLIC_ACL_ADDRESS || '0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">KMS Verifier:</span>
                  <p className="font-mono text-xs mt-1">
                    {process.env.NEXT_PUBLIC_KMS_ADDRESS || '0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Security Note:</strong> Never expose private keys or sensitive
            configuration in client-side code. All keys are managed securely through
            the Zama infrastructure.
          </p>
        </div>
      </div>
    </Card>
  );
};
