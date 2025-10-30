import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for encryption operations
 */

export async function POST(request: NextRequest) {
  try {
    const { value, type, contractAddress } = await request.json();

    // Validate inputs
    if (!value || !type || !contractAddress) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Note: Actual encryption should happen client-side for security
    // This endpoint is for demonstration purposes
    return NextResponse.json({
      success: true,
      data: {
        message: 'For security, encryption should be performed client-side',
        recommendation: 'Use the SDK hooks (useEncrypt) in your components',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Encryption API endpoint',
    usage: {
      method: 'POST',
      body: {
        value: 'any',
        type: 'uint32 | uint64 | bool',
        contractAddress: 'string',
      },
    },
  });
}
