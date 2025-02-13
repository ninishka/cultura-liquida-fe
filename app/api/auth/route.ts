import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '@/app/actions/auth';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { password } = await request.json();
    const isValid = await verifyPassword(password);
    if (isValid) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}