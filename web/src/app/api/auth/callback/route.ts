import { NextRequest, NextResponse } from 'next/server'

import { api } from '~/services/api'

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', { code })

  const { token } = registerResponse.data

  const redirectURL = redirectTo ?? new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  const response = NextResponse.redirect(redirectURL)

  response.cookies.set({
    name: 'token',
    value: token,
    path: '/',
    maxAge: cookieExpiresInSeconds,
  })

  return response
}
