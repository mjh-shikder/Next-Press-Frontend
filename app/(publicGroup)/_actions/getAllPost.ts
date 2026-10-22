"use server"

export type GetAllPostsResponse = {
    success: boolean
    statusCode: number
    message: string
    data: unknown[]
    meta: {
        page: number
        limit: number
        total: number
        totalPages: number
    }
}

const isGetAllPostsResponse = (value: unknown): value is GetAllPostsResponse => {
    if (typeof value !== "object" || value === null || !("meta" in value)) {
        return false
    }

    const meta = value.meta
    return (
        "success" in value &&
        typeof value.success === "boolean" &&
        "statusCode" in value &&
        typeof value.statusCode === "number" &&
        "message" in value &&
        typeof value.message === "string" &&
        "data" in value &&
        Array.isArray(value.data) &&
        typeof meta === "object" &&
        meta !== null &&
        "page" in meta &&
        typeof meta.page === "number" &&
        "limit" in meta &&
        typeof meta.limit === "number" &&
        "total" in meta &&
        typeof meta.total === "number" &&
        "totalPages" in meta &&
        typeof meta.totalPages === "number"
    )
}

export const getAllPost = async (): Promise<GetAllPostsResponse> => {
    const backendUrl = process.env.BACKEND_API_URL
    if (!backendUrl) {
        throw new Error("BACKEND_URL is not configured.")
    }

    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/posts`)
    if (!response.ok) {
        throw new Error(`Failed to fetch posts (HTTP ${response.status}).`)
    }

    const result: unknown = await response.json()
    if (!isGetAllPostsResponse(result)) {
        throw new Error("Posts API returned an invalid response.")
    }

    return result
}