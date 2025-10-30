"use client";

/**
 * Homomorphic computation demonstration component
 */

import React, { useState } from 'react';
import { useComputation, type ComputationOperation } from '../../hooks/useComputation';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const ComputationDemo: React.FC = () => {
  const [operation, setOperation] = useState<ComputationOperation>('add');
  const [handleA, setHandleA] = useState('');
  const [handleB, setHandleB] = useState('');
  const { compute, isComputing, error, result, reset } = useComputation();

  const handleCompute = async () => {
    try {
      await compute(operation, BigInt(handleA), BigInt(handleB));
    } catch (err) {
      console.error('Computation error:', err);
    }
  };

  const operations: { value: ComputationOperation; label: string; symbol: string }[] = [
    { value: 'add', label: 'Add', symbol: '+' },
    { value: 'subtract', label: 'Subtract', symbol: '-' },
    { value: 'multiply', label: 'Multiply', symbol: '×' },
    { value: 'divide', label: 'Divide', symbol: '÷' },
  ];

  return (
    <Card title="Homomorphic Computation" padding="lg">
      <div className="space-y-6">
        {/* Operation Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Operation
          </label>
          <div className="grid grid-cols-4 gap-2">
            {operations.map((op) => (
              <button
                key={op.value}
                onClick={() => {
                  setOperation(op.value);
                  reset();
                }}
                className={`px-3 py-2 rounded-lg border-2 transition-all ${
                  operation === op.value
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="text-xl">{op.symbol}</div>
                <div className="text-xs">{op.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Handles */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Encrypted Handle A"
            type="text"
            value={handleA}
            onChange={(e) => setHandleA(e.target.value)}
            placeholder="First handle"
            className="font-mono text-sm"
          />
          <Input
            label="Encrypted Handle B"
            type="text"
            value={handleB}
            onChange={(e) => setHandleB(e.target.value)}
            placeholder="Second handle"
            className="font-mono text-sm"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={handleCompute}
            isLoading={isComputing}
            disabled={!handleA || !handleB}
            className="flex-1"
            variant="primary"
          >
            Compute
          </Button>
          <Button
            onClick={() => {
              reset();
              setHandleA('');
              setHandleB('');
            }}
            variant="secondary"
          >
            Reset
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-3">Computation Result</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Operation:</span>
                <span>{result.operation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span className="text-green-600">{result.status}</span>
              </div>
              <div className="mt-3 p-3 bg-white rounded border border-purple-300">
                <p className="text-xs text-gray-600 mb-2">
                  Computation performed on encrypted values without decryption
                </p>
                <p className="font-mono text-xs break-all">
                  Result handle would be returned from smart contract
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
