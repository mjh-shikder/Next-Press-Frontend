"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
    success: boolean
    statusCode?: number
    message: string
    data?: {
        accessToken: string
        refreshToken: string
    }
}

export type RegisterState = {
    success: boolean
    statusCode?: number
    message: string
}

export const loginAction = async (_prevState: LoginState, formData: FormData): Promise<LoginState> => {
    const email = formData.get("email")
    const password = formData.get("password")

    if (typeof email !== "string" || typeof password !== "string") {
        return { success: false, message: "Email and password are required." }
    }

    const backendApiUrl = process.env.BACKEND_API_URL
    if (!backendApiUrl) {
        console.error("Login failed: BACKEND_API_URL is not configured.")
        return { success: false, message: "Login service is not configured. Please contact support." }
    }

    const payload = {
        email,
        password
    }

    let res: Response
    try {
        res = await fetch(`${backendApiUrl.replace(/\/$/, "")}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
    } catch (error) {
        console.error("Login API request failed. Check that the backend is running and BACKEND_API_URL is correct.", error)
        return {
            success: false,
            message: "Cannot connect to the login server. Make sure the backend is running and try again."
        }
    }

    let result: LoginState
    try {
        result = await res.json()
    } catch (error) {
        console.error(`Login API returned an invalid response (HTTP ${res.status}).`, error)
        return { success: false, message: "The login server returned an invalid response. Please try again." }
    }

    if (result.success) { 
        if (!result.data?.accessToken || !result.data.refreshToken) {
            return { success: false, message: "Login response did not include authentication tokens." }
        }

        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 ,
            sameSite: "lax"
        })
        
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        })

        redirect("/")

    }
    return result
}

export const logoutAction = async () => {
    const cookieStore = await cookies()

    cookieStore.delete("accessToken")
    cookieStore.delete("refreshToken")

    revalidateTag("my-profile", "max")
    redirect("/login")

}


export const registerAction = async (_prevState: RegisterState, formData: FormData): Promise<RegisterState> => {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const profilePhoto = formData.get("profilePhoto")
    const role = formData.get("role")

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        typeof profilePhoto !== "string" ||
        (role !== "AUTHOR" && role !== "USER")
    ) {
        return { success: false, message: "Please complete all fields and choose a valid role." }
    }

    const normalizedName = name.trim()
    const normalizedEmail = email.trim()
    const normalizedProfilePhoto = profilePhoto.trim()
    if (!normalizedName || !normalizedEmail || !password || !normalizedProfilePhoto) {
        return { success: false, message: "Please complete all fields." }
    }

    const backendApiUrl = process.env.BACKEND_API_URL
    if (!backendApiUrl) {
        console.error("Registration failed: BACKEND_API_URL is not configured.")
        return { success: false, message: "Registration service is not configured. Please contact support." }
    }

    let res: Response
    try {
        res = await fetch(`${backendApiUrl.replace(/\/$/, "")}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: normalizedName,
                email: normalizedEmail,
                password,
                profilePhoto: normalizedProfilePhoto,
                role,
            }),
        })
    } catch (error) {
        console.error("Registration API request failed. Check that the backend is running and BACKEND_API_URL is correct.", error)
        return {
            success: false,
            message: "Cannot connect to the registration server. Make sure the backend is running and try again.",
        }
    }

    try {
        const result: unknown = await res.json()
        if (
            typeof result !== "object" ||
            result === null ||
            !("success" in result) ||
            typeof result.success !== "boolean"
        ) {
            console.error(`Registration API returned an unexpected response (HTTP ${res.status}).`)
            return { success: false, message: "The registration server returned an invalid response. Please try again." }
        }

        return {
            success: res.ok && result.success,
            statusCode: "statusCode" in result && typeof result.statusCode === "number"
                ? result.statusCode
                : res.status,
            message: "message" in result && typeof result.message === "string"
                ? result.message
                : res.ok
                    ? "Registration completed."
                    : "Registration failed. Please try again.",
        }
    } catch (error) {
        console.error(`Registration API returned an invalid response (HTTP ${res.status}).`, error)
        return { success: false, message: "The registration server returned an invalid response. Please try again." }
    }
}