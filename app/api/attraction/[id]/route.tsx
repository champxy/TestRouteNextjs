import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const response = await fetch(`https://www.melivecode.com/api/attractions/${id}`);
    const data = await response.json();
    return NextResponse.json(data);
}
