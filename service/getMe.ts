"use server"

import { cookies } from "next/headers";


export const getMe = async () => { 
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) { 
        return {
            success: false,
            message: "user not logged in ",

        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`, {
        headers: {
            Authorization: accessToken,
                // Authorization: `${accessToken}`,
            //  Authorization: `Bearer ${accessToken}`,

        //    cookie: `accessToken=${accessToken}`

        }
    });

    const result = await res.json()

    // console.log(result, "Result ");
    

    return result
    
}
