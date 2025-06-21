import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';
import type { ContactSubmission } from '@/types/models';

// Basic email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let submissionData;
  try {
    submissionData = await request.json();
  } catch (error) {
    console.error('API Error - Invalid JSON payload for contact submission:', error);
    return NextResponse.json({ message: 'Invalid JSON payload. Please ensure data is correctly formatted.' }, { status: 400 });
  }

  const { name, email, message } = submissionData as Omit<ContactSubmission, 'id' | 'submittedAt'>;

  // Backend Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ message: 'Name is required.' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return NextResponse.json({ message: 'A valid email is required.' }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ message: 'Message is required.' }, { status: 400 });
  }
  // Optional: Add length checks for name and message

  try {
    const pool = getDBPool();
    const result = await pool.query(
      'INSERT INTO contact_submissions (name, email, message, submitted_at) VALUES ($1, $2, $3, NOW()) RETURNING id, name, email, message, submitted_at AS "submittedAt"',
      [name.trim(), email.trim(), message.trim()]
    );

    const newSubmission = result.rows[0];
    console.log('Contact form submission successful:', newSubmission);

    // In a real application, you might also send an email notification here

    return NextResponse.json({
      message: 'Contact form submitted successfully!',
      data: newSubmission
    }, { status: 201 });

  } catch (error) {
    console.error('API Error - Failed to save contact submission to DB:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Failed to submit contact form due to a server error.', error: errorMessage }, { status: 500 });
  }
}
