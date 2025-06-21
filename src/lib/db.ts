import { Pool } from 'pg';

let pool: Pool;

export function getDBPool() {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL; // Or DATABASE_URL, common for Heroku/Vercel
    if (!connectionString) {
      throw new Error("PostgreSQL connection string is not defined in environment variables.");
    }

    pool = new Pool({
      connectionString,
      // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      // You might need SSL configuration for production databases
    });

    pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }
  return pool;
}

// Example of how to query
// export async function query(text: string, params?: any[]) {
//   const start = Date.now();
//   const pool = getDBPool();
//   const res = await pool.query(text, params);
//   const duration = Date.now() - start;
//   console.log('executed query', { text, duration, rows: res.rowCount });
//   return res;
// }

// For Next.js, it's often better to create and release clients on a per-request basis
// especially in serverless environments.
// export async function getClient() {
//   const pool = getDBPool();
//   const client = await pool.connect();
//   const query = client.query;
//   const release = client.release;
//   // monkey patch the query method to keep track of the last query
//   // @ts-ignore
//   client.query = (...args) => {
//     // @ts-ignore
//     client.lastQuery = args;
//     // @ts-ignore
//     return query.apply(client, args);
//   };
//   return client;
// }

// console.log("Database module loaded. Pool will be initialized on first use."); // Removed for cleaner logs
