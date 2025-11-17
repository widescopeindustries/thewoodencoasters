import { NextResponse } from 'next/server';
import { VEHICLE_MAKES } from '@/lib/data/vehicles';

export async function GET() {
  return NextResponse.json({ makes: VEHICLE_MAKES });
}
