import { getCustomSession } from "../SessionCode.js";

export async function GET(req) {
  let session = await getCustomSession();

  // Retrieve session data
  const email = session.email || 'No email set in session';
  const role = session.role || 'No role set in session';

  console.log("Retrieved session data:", { email, role });

  return new Response(
    JSON.stringify({ email, role }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
