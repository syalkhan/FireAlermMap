import { NextResponse } from 'next/server';
import pool from '../../../db'; // Assuming db.js is in the root directory.

export async function GET() {
  try {
    console.log(pool);
    const result = await pool.query('SELECT * FROM nasa_viirs_fire_alerts');
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
