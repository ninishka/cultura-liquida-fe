import { NextRequest, NextResponse } from 'next/server';
import { getStates, getCities } from '@/app/components/ModalComponent/FormComponent/countryHelpers.server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'states') {
    const states = await getStates();
    return NextResponse.json(states);
  }

  if (type === 'cities') {
    const state = searchParams.get('state');
    if (!state) {
      return NextResponse.json({ error: 'Missing state param' }, { status: 400 });
    }
    const cities = await getCities(state);
    return NextResponse.json(cities);
  }

  return NextResponse.json({ error: 'Invalid type param' }, { status: 400 });
} 