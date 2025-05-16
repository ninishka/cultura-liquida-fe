import { NextRequest, NextResponse } from 'next/server';
import { sendEmails } from '@/app/actions/emails';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { data } = await request.json();
    sendEmails(data).catch(err =>console.error('sendEmails error:', err));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}

