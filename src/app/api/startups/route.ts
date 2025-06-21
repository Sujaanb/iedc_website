import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';
import type { Startup } from '@/types/models';

export async function GET() {
  try {
    const pool = getDBPool();
    // Ensure column names in DB (e.g., trade_license, logo_url) are mapped to camelCase fields in Startup type
    const result = await pool.query<Startup>(
      `SELECT id, name, objective,
              trade_license AS "tradeLicense",
              logo_url AS "logoUrl",
              founded_date AS "foundedDate",
              website_url AS "websiteUrl"
       FROM startups ORDER BY name ASC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('API Error - Failed to fetch startups:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to fetch startup data', error: errorMessage }, { status: 500 });
  }
}

// export const revalidate = 60; // Example revalidation
