import sgMail from '@sendgrid/mail'; // IMPORTS SENDGRID MAIL PACKAGE
import { getIronSession } from 'iron-session'; // IMPORTS IRON SESSION FOR SESSION HANDLING
import { cookies } from 'next/headers'; // IMPORTS COOKIES FOR HANDLING

//SET API KEY FOR SENDGRID (ENSURE IT IS SET IN ENVIRONMENT VARIABLES)
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

//EXPORT POST METHOD FOR HANDLING EMAIL SENDING
export async function POST(req) {
  try {
    const body = await req.json(); // GET THE REQUEST BODY
    const { subject, text } = body; // EXTRACT SUBJECT AND TEXT FROM THE BODY
    
    //RETRIEVE USER EMAIL FROM SESSION
    const session = await getIronSession(cookies(), { password: process.env.SESSION_SECRET, cookieName: "app" });
    const userEmail = session?.user?.email; // ASSUMING SESSION STORES USER INFO LIKE THIS
    
    if (!userEmail) { // IF USER EMAIL IS NOT FOUND IN SESSION, RETURN ERROR
      return new Response(JSON.stringify({ error: 'User not logged in' }), { status: 401 });
    }

    //CREATE MESSAGE OBJECT FOR SENDGRID EMAIL
    const msg = {
      to: userEmail, // SEND EMAIL TO LOGGED IN USER'S EMAIL
      from: 'jordananiuzu@gmail.com', // USE YOUR VERIFIED SENDGRID EMAIL HERE
      subject,
      text,
    };

    await sgMail.send(msg); // SEND THE EMAIL USING SENDGRID
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    //LOGGING ERROR IF EMAIL SENDING FAILS
    console.error('Error sending email:', error.response?.body || error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}
