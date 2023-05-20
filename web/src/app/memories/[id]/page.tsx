import React, { Suspense } from 'react'

import { cookies } from 'next/headers'
import Link from 'next/link'

import { ChevronLeft } from 'lucide-react'

import { api } from '~/services/api'

import { NewMemoryForm } from '~/components/NewMemoryForm'

import { getUser } from '~/lib/auth'

interface MemoriesProps {
  params: {
    id: string
  }
}

const Memories = async ({ params: { id } }: MemoriesProps) => {
  const token = cookies().get('token')?.value
  const { sub } = getUser()

  const response = await api.get(`/memories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="-w4 h-4" />
        voltar à timeline
      </Link>

      <Suspense fallback={<div>loading</div>}>
        <NewMemoryForm userId={sub} memory={response.data} />
      </Suspense>
    </div>
  )
}

export default Memories
