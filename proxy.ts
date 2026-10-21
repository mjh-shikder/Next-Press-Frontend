import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getNewAccessToken } from './service/refreshToken'

const AUTH_ROUTES = ["/login", "/register"]
const PUBLIC_ROUTES = ["/", "/news"]

const verifyToken = (token: string, secret: string | undefined): JwtPayload | null => {
    if (!secret) {
        throw new Error("JWT verification secret is not configured.")
    }

    try {
        const payload = jwt.verify(token, secret)
        return typeof payload === "string" ? null : payload
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return null
        }

        throw error
    }
}

const matchesRoute = (pathname: string, route: string) =>
    pathname === route || pathname.startsWith(`${route}/`)

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isPublic = PUBLIC_ROUTES.some((route) => matchesRoute(pathname, route))
    const isAuthRoute = AUTH_ROUTES.some((route) => matchesRoute(pathname, route))

    let accessToken = request.cookies.get("accessToken")?.value
    const refreshToken = request.cookies.get("refreshToken")?.value

    let decodedAccessToken = accessToken
        ? verifyToken(accessToken, process.env.JWT_ACCESS_SECRET)
        : null
    const decodedRefreshToken = refreshToken
        ? verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET)
        : null

    let updatedAccessToken: string | undefined
    let shouldDeleteAccessToken = false
    let shouldDeleteRefreshToken = false

    if (!decodedAccessToken && decodedRefreshToken && refreshToken) {
        const result = await getNewAccessToken(refreshToken)

        if (result.success) {
            accessToken = result.data.accessToken
            decodedAccessToken = verifyToken(accessToken, process.env.JWT_ACCESS_SECRET)
            updatedAccessToken = accessToken
        } else {
            shouldDeleteAccessToken = true
            shouldDeleteRefreshToken = true
        }
    }

    if (!decodedAccessToken && accessToken) {
        shouldDeleteAccessToken = true
    }

    const userRole = decodedAccessToken?.role
    const withUpdatedCookies = (response: NextResponse) => {
        if (updatedAccessToken) {
            response.cookies.set("accessToken", updatedAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
                path: "/",
            })
        }
        if (shouldDeleteAccessToken) {
            response.cookies.delete("accessToken")
        }
        if (shouldDeleteRefreshToken) {
            response.cookies.delete("refreshToken")
        }
        return response
    }

    const redirect = (path: string) =>
        withUpdatedCookies(NextResponse.redirect(new URL(path, request.url)))

    if (decodedAccessToken && isAuthRoute) {
        if (userRole === "USER") {
            return redirect("/dashboard")
        }
        if (userRole === "ADMIN") {
            return redirect("/admin-dashboard")
        }
        if (userRole === "AUTHOR") {
            return redirect("/author-dashboard")
        }
        return redirect("/")
    }

    if (!decodedAccessToken && !isPublic && !isAuthRoute) {
        return redirect("/login")
    }

    if (matchesRoute(pathname, "/dashboard") && userRole !== "USER") {
        return redirect("/")
    }
    if (matchesRoute(pathname, "/admin-dashboard") && userRole !== "ADMIN") {
        return redirect("/")
    }
    if (matchesRoute(pathname, "/author-dashboard") && userRole !== "AUTHOR") {
        return redirect("/")
    }

    return withUpdatedCookies(NextResponse.next())
}


export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'
    ]
}