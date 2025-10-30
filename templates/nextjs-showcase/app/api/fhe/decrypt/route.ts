import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for decryption operations
 */

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, handle, method } = await request.json();

    if (!contractAddress || !handle) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Note: Actual decryption requires user signatures (EIP-712)
    // This should be handled client-side
    return NextResponse.json({
      success: true,
      data: {
        message: 'Decryption requires user signatures and should be client-side',
        recommendation: 'Use the SDK hooks (useDecrypt) in your components',
        method: method || 'user',
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
    message: 'Decryption API endpoint',
    usage: {
      method: 'POST',
      body: {
        contractAddress: 'string',
        handle: 'string',
        method: 'user | public',
      },
    },
  });
}
