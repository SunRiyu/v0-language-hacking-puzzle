import { NextRequest, NextResponse } from 'next/server';
import puzzlesData from '@/public/data/puzzles.json';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get('difficulty');
    const languageId = searchParams.get('language');

    let filtered = puzzlesData as any[];

    if (difficulty) {
      filtered = filtered.filter(p => p.difficulty === parseInt(difficulty));
    }

    if (languageId) {
      filtered = filtered.filter(p => p.language_id === languageId);
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('[v0] Error fetching puzzles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch puzzles' },
      { status: 500 }
    );
  }
};
