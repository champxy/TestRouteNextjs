// app/api/attractions/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const response = await fetch('https://www.melivecode.com/api/attractions');
    const data = await response.json();
    return NextResponse.json(data);
}

