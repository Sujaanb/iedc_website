import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';
import type { GalleryImage } from '@/types/models';

export async function GET() {
  try {
    const pool = getDBPool();
    // Ensure column names in DB (e.g., alt_text, uploaded_at) are mapped to camelCase fields in GalleryImage type
    const result = await pool.query<GalleryImage>(
      `SELECT id, url, alt_text AS "altText", caption, uploaded_at AS "uploadedAt"
       FROM gallery_images ORDER BY uploaded_at DESC, id DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('API Error - Failed to fetch gallery images:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to fetch gallery data', error: errorMessage }, { status: 500 });
  }
}

// export const revalidate = 300; // Example revalidation (e.g. 5 minutes)
