"use client";

/**
 * Encryption demonstration component
 */

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const EncryptionDemo: React.FC = () => {
  const [encryptionType, setEncryptionType] = useState<'uint32' | 'uint64' | 'bool'>('uint32');
  const [value, setValue] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const { encryptValue, isEncrypting, error, result, reset } = useEncryption();

  const handleEncrypt = async () => {
    await encryptValue(value, encryptionType, contractAddress);
  };

  const handleReset = () => {
    reset();
    setValue('');
  };

  return (
    <Card title="Encryption Demo" padding="lg">
      <div className="space-y-6">
        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Data Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['uint32', 'uint64', 'bool'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setEncryptionType(type);
                  reset();
                }}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  encryptionType === type
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Value Input */}
        <Input
          label="Value"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            encryptionType === 'bool' ? 'true or false' : 'Enter a number'
          }
          error={error || undefined}
        />

        {/* Contract Address */}
        <Input
          label="Contract Address"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          className="font-mono text-sm"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleEncrypt}
            isLoading={isEncrypting}
            disabled={!value || !contractAddress}
            className="flex-1"
          >
            Encrypt
          </Button>
          <Button onClick={handleReset} variant="secondary">
            Reset
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Encrypted Successfully</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Handle: </span>
                <span className="font-mono break-all">
                  {result.handles?.[0]?.toString() || 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-medium">Proof: </span>
                <span className="font-mono break-all text-xs">
                  {result.inputProof?.slice(0, 50)}...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
