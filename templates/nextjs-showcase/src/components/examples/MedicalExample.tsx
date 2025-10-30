"use client";

/**
 * Medical/Healthcare use case example with FHE
 */

import React, { useState } from 'react';
import { useEncryption } from '../../hooks/useEncryption';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const MedicalExample: React.FC = () => {
  const [bloodPressure, setBloodPressure] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [diagnosis, setDiagnosis] = useState(false);
  const { encryptValue, isEncrypting, result, reset } = useEncryption();

  // Example contract address for medical records
  const medicalContractAddress = '0x0000000000000000000000000000000000000002';

  const handleEncryptVital = async (value: string, type: 'uint32' | 'bool') => {
    await encryptValue(value, type, medicalContractAddress);
  };

  return (
    <Card title="Private Medical Records Example" padding="lg">
      <div className="space-y-6">
        {/* Description */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Use Case</h4>
          <p className="text-sm text-purple-800">
            Encrypt sensitive medical data such as vital signs and diagnoses. Medical
            professionals can perform computations and analysis on encrypted patient
            data while maintaining complete privacy.
          </p>
        </div>

        {/* Vital Signs */}
        <div className="space-y-4">
          <h5 className="font-semibold text-gray-900">Encrypt Vital Signs</h5>

          <Input
            label="Blood Pressure (Systolic)"
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder="e.g., 120"
            helperText="Systolic blood pressure in mmHg"
          />
          <Button
            onClick={() => handleEncryptVital(bloodPressure, 'uint32')}
            isLoading={isEncrypting}
            disabled={!bloodPressure}
            size="sm"
          >
            Encrypt Blood Pressure
          </Button>

          <Input
            label="Glucose Level"
            type="text"
            value={glucoseLevel}
            onChange={(e) => setGlucoseLevel(e.target.value)}
            placeholder="e.g., 95"
            helperText="Blood glucose in mg/dL"
          />
          <Button
            onClick={() => handleEncryptVital(glucoseLevel, 'uint32')}
            isLoading={isEncrypting}
            disabled={!glucoseLevel}
            size="sm"
          >
            Encrypt Glucose Level
          </Button>
        </div>

        {/* Boolean Health Status */}
        <div className="space-y-3">
          <h5 className="font-semibold text-gray-900">Encrypt Diagnosis</h5>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={diagnosis}
                onChange={(e) => setDiagnosis(e.target.checked)}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm">Condition Present</span>
            </label>
          </div>
          <Button
            onClick={() => handleEncryptVital(diagnosis.toString(), 'bool')}
            isLoading={isEncrypting}
            size="sm"
          >
            Encrypt Diagnosis
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-green-900 mb-2">Data Encrypted</h5>
            <p className="text-sm text-green-800 mb-3">
              Medical data is now encrypted and can be stored on-chain while maintaining
              complete patient privacy.
            </p>
            <div className="p-3 bg-white rounded border border-green-300">
              <p className="text-xs font-medium mb-1">Encrypted Handle:</p>
              <p className="font-mono text-xs break-all">
                {result.handles?.[0]?.toString()}
              </p>
            </div>
          </div>
        )}

        {/* Privacy Features */}
        <div className="border-t pt-4">
          <h5 className="font-semibold text-gray-900 mb-3">Privacy Guarantees</h5>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Patient data encrypted at all times</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Medical analysis on encrypted values</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>HIPAA-compliant privacy protection</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Authorized access control for doctors</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Tamper-proof audit trail on blockchain</span>
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
