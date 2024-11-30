import { getCustomSession } from "../SessionCode.js";

export async function GET(req) {
  let session = await getCustomSession();

  // RETRIEVES SESSION DATA
  const email = session.email || 'No email set in session'; //EMAIL
  const role = session.role || 'No role set in session';// ROLE (CUSTOMER OR MANAGER)

  console.log("Retrieved session data:", { email, role });

  return new Response(
    JSON.stringify({ email, role }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
