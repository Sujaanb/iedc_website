import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

interface SiteConfigParams {
  params: {
    configKey: string;
  };
}

export async function GET(request: Request, { params }: SiteConfigParams) {
  const { configKey } = params;

  if (!configKey) {
    return NextResponse.json({ message: 'Config key is required' }, { status: 400 });
  }

  try {
    const pool = getDBPool();
    const result = await pool.query(
      'SELECT config_key AS "configKey", config_value AS "configValue" FROM site_configuration WHERE config_key = $1',
      [configKey]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: `Configuration for key '${configKey}' not found` }, { status: 404 });
    }

    // The config_value is stored as JSONB, so it's already parsed by node-pg
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`API Error - Failed to fetch site configuration for key ${configKey}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: `Failed to fetch site configuration for '${configKey}'`, error: errorMessage }, { status: 500 });
  }
}

// Optional: Add revalidation
// export const revalidate = 3600; // Revalidate every hour, for example
