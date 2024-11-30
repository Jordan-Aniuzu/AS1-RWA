import { getIronSession } from 'iron-session';  // GETS IRON SESSION

import { cookies } from 'next/headers' // IMPORTS COOKIES FOR HANDLING

export async function getCustomSession() {

    //LOGGING SESSION LOADING PROCESS
    console.log("LOADING SESSION STUFF")

    //SETTING SESSION PASSWORD (SECRET KEY) FOR IRON SESSION
    let pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf"

    //FETCHING THE SESSION USING IRON SESSION AND COOKIES
    const session = await getIronSession(cookies(), { password: pw, cookieName: "app" });

    //RETURNS THE SESSION OBJECT
    return session
}
