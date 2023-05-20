import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const redirectURL = new URL('/', request.url)

  const response = NextResponse.redirect(redirectURL)

  response.cookies.delete('token')

  return response
}
