import './globals.css'

import React from 'react'

import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { cookies } from 'next/headers'

import { CopyRight } from '~/components/CopyRight'
import { Hero } from '~/components/Hero'
import { Profile } from '~/components/Profile'
import { SignIn } from '~/components/SignIn'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

const baiJamjuree = BaiJamjuree({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const isAuthenticated = cookies().has('token')

  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
    >
      <body className="bg-zinc-900 text-zinc-200">
        <main className="grid grid-cols-2 max-md:flex max-md:flex-col">
          {/* Left */}
          <div className="relative flex flex-col items-start justify-between gap-5 overflow-hidden border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover p-8 sm:px-28 sm:py-16 md:border-r">
            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <div className="max-md:hidden">
              <CopyRight />
            </div>
          </div>

          {/* Right */}
          <div className="relative flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover md:h-screen md:overflow-y-scroll">
            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes md:hidden" />
            <>{children}</>

            {/* CopyRight */}
            <div className="flex items-center justify-center py-2 md:hidden">
              <CopyRight />
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}

export default RootLayout
