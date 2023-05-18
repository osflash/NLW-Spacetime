import React from 'react'

import Link from 'next/link'

export const CopyRight: React.FC = () => {
  return (
    <div className="text-sm leading-relaxed text-gray-200">
      Feito com 💜 no NLW da{' '}
      <Link
        className="underline hover:text-gray-100"
        href="https://rocketseat.com.br"
        rel="noreferrer"
        target="_blank"
      >
        Rocketseat
      </Link>
    </div>
  )
}
