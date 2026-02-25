import { NextRequest, NextResponse } from 'next/server';

// In a real app, this would save to Supabase
// For now, we store in memory for demo purposes
const progressStore = new Map<string, any>();

export const POST = async (request: NextRequest) => {
  try {
    const { userId, puzzleId, correct, attempts, hintsUsed, timeSpentSeconds } = await request.json();

    if (!userId || puzzleId === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const key = `${userId}:${puzzleId}`;
    progressStore.set(key, {
      puzzleId,
      correct,
      attempts,
      hintsUsed,
      timeSpentSeconds,
      completedAt: new Date().toISOString(),
    });

    console.log(`[v0] Saved progress for puzzle ${puzzleId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Error saving progress:', error);
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    );
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId' },
        { status: 400 }
      );
    }

    const userProgress: any[] = [];
    for (const [key, value] of progressStore) {
      if (key.startsWith(`${userId}:`)) {
        userProgress.push(value);
      }
    }

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error('[v0] Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
};
