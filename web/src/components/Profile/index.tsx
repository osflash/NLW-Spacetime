import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { getUser } from '~/lib/auth'

export const Profile: React.FC = () => {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          src={avatarUrl}
          width={40}
          height={40}
          alt=""
          className="h-10 w-10 rounded-full"
        />
      </div>

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <Link
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
          prefetch={false}
          replace
        >
          Quero sair
        </Link>
      </p>
    </div>
  )
}
