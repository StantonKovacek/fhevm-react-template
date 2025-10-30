"use client";

/**
 * Banking use case example with FHE
 */

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const BankingExample: React.FC = () => {
  const [balance, setBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const { encryptValue, isEncrypting, result, reset } = useEncryption();

  // Example contract address (would be real in production)
  const bankContractAddress = '0x0000000000000000000000000000000000000001';

  const handleEncryptBalance = async () => {
    await encryptValue(balance, 'uint64', bankContractAddress);
  };

  const handleEncryptTransfer = async () => {
    await encryptValue(transferAmount, 'uint64', bankContractAddress);
  };

  return (
    <Card title="Private Banking Example" padding="lg">
      <div className="space-y-6">
        {/* Description */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Use Case</h4>
          <p className="text-sm text-blue-800">
            Encrypt sensitive financial data like account balances and transfer amounts.
            With FHE, you can perform operations on encrypted values without revealing
            the actual amounts.
          </p>
        </div>

        {/* Balance Encryption */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">Encrypt Account Balance</h5>
          <Input
            label="Balance Amount"
            type="text"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="e.g., 1000000"
            helperText="Enter balance in smallest unit (e.g., cents)"
          />
          <Button
            onClick={handleEncryptBalance}
            isLoading={isEncrypting}
            disabled={!balance}
          >
            Encrypt Balance
          </Button>
        </div>

        {/* Transfer Amount */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">Encrypt Transfer Amount</h5>
          <Input
            label="Transfer Amount"
            type="text"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="e.g., 50000"
          />
          <Button
            onClick={handleEncryptTransfer}
            isLoading={isEncrypting}
            disabled={!transferAmount}
          >
            Encrypt Transfer
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-green-900 mb-2">Encrypted Successfully</h5>
            <p className="text-sm text-green-800 mb-3">
              The amount is now encrypted and can be used in smart contract transactions
              without revealing the actual value.
            </p>
            <div className="p-3 bg-white rounded border border-green-300">
              <p className="text-xs font-medium mb-1">Encrypted Handle:</p>
              <p className="font-mono text-xs break-all">
                {result.handles?.[0]?.toString()}
              </p>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="border-t pt-4">
          <h5 className="font-semibold text-gray-900 mb-3">Privacy Features</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Balance remains encrypted on-chain</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Transfer amounts hidden from public view</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Compute on encrypted values (add, subtract, compare)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Only authorized users can decrypt their balances</span>
            </li>
          </ul>
        </div>

        <Button onClick={reset} variant="secondary" className="w-full">
          Reset
        </Button>
      </div>
    </Card>
  );
};
