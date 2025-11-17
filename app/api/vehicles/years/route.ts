import { NextResponse } from 'next/server';
import { VEHICLE_YEARS } from '@/lib/data/vehicles';

export async function GET() {
  return NextResponse.json({ years: VEHICLE_YEARS });
}
