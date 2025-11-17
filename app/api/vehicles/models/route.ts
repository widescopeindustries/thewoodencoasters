import { NextRequest, NextResponse } from 'next/server';
import { getModelsForMake } from '@/lib/data/vehicles';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const make = searchParams.get('make');

  if (!make) {
    return NextResponse.json(
      { error: 'Make parameter is required' },
      { status: 400 }
    );
  }

  const models = getModelsForMake(make);
  return NextResponse.json({ models });
}
