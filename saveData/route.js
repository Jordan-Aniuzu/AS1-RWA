import { getCustomSession } from '../SessionCode.js';

export async function POST(req) {
  try {
    // Parse the request body
    const { email, role } = await req.json();

    // Load the session
    let session = await getCustomSession();

    // Set the session values
    session.email = email;
    session.role = role;

    // Save the session
    await session.save();

    console.log('Session data saved:', { email, role });

    // Return a success response using the Web Streams API
    return new Response(
      JSON.stringify({ success: true, message: 'Session data saved successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error saving session data:', error);

    // Return an error response
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to save session data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
