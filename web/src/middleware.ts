import { NextRequest, NextResponse } from 'next/server'

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get('token')?.value

  if (!token) {
    const response = NextResponse.redirect(signInURL)

    response.cookies.set({
      name: 'redirectTo',
      value: request.url,
      path: '/',
      maxAge: 30,
      httpOnly: true,
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/memories/:path*',
}
