import { getCustomSession } from '../SessionCode.js';

export async function POST(req) {
  try {
    //PARSES THE REQUEST BODY EXTRACTS EMAIL AND ROLE FROM THE REQUEST BODY
    const { email, role } = await req.json();

    //LOADS THE SESSION CREATES OR FETCHES A CUSTOM SESSION OBJECT
    let session = await getCustomSession();

    //SETS THE SESSION VALUES ASSIGNS THE EMAIL AND ROLE TO THE SESSION
    session.email = email;
    session.role = role;

    //SAVES THE SESSION PERSISTS THE SESSION DATA
    await session.save();

    console.log('SESSION DATA SAVED', { email, role });

    //RETURNS A SUCCESS RESPONSE SUCCESS MESSAGE AND HTTP STATUS 200
    return new Response(
      JSON.stringify({ success: true, message: 'SESSION DATA SAVED SUCCESSFULLY' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('ERROR SAVING SESSION DATA', error);

    //RETURNS AN ERROR RESPONSE FAILURE MESSAGE AND HTTP STATUS 500
    return new Response(
      JSON.stringify({ success: false, message: 'FAILED TO SAVE SESSION DATA' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
