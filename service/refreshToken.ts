type RefreshTokenResult =
    | { success: true; data: { accessToken: string } }
    | { success: false; message?: string }

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null

export const getNewAccessToken = async (refreshToken: string): Promise<RefreshTokenResult> => {
    const backendApiUrl = process.env.BACKEND_API_URL
    if (!backendApiUrl) {
        throw new Error("BACKEND_API_URL is not configured.")
    }

    const res = await fetch(`${backendApiUrl.replace(/\/$/, "")}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
           cookie: `refreshToken=${refreshToken}`
        }
    })

    const result: unknown = await res.json()
    if (!isRecord(result) || typeof result.success !== "boolean") {
        throw new Error(`Refresh token API returned an invalid response (HTTP ${res.status}).`)
    }

    if (!res.ok || !result.success) {
        return {
           success: false,
           message: typeof result.message === "string" ? result.message : undefined
        }
    }

    if (!isRecord(result.data) || typeof result.data.accessToken !== "string") {
        throw new Error("Refresh token API response did not include an access token.")
    }

    return {
        success: true,
        data: { accessToken: result.data.accessToken }
    }
}
