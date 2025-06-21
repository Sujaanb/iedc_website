import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db'; // Assuming db.ts is in src/lib
import type { Coordinator } from '@/types/models';

export async function GET() {
  try {
    const pool = getDBPool();
    // The table uses photo_url, ensure your type matches or alias in query
    const result = await pool.query<Coordinator>(
      'SELECT id, name, title, department, email, photo_url as "photoUrl" FROM coordinators ORDER BY name ASC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('API Error - Failed to fetch team:', error);
    // It's good practice to not expose detailed error messages to the client in production
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to fetch team data', error: errorMessage }, { status: 500 });
  }
}

// Optional: Add revalidation instructions for Next.js caching if needed
// export const revalidate = 60; // Revalidate every 60 seconds
