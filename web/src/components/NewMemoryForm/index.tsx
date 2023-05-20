'use client'

import React, { FormEvent, useState } from 'react'

import { useRouter } from 'next/navigation'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'

import { api } from '~/services/api'

import { MediaPicker } from '~/components/MediaPicker'

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

interface NewMemoryFormProps {
  userId?: string
  memory?: Memory
}

dayjs.locale(ptBR)

export const NewMemoryForm: React.FC<NewMemoryFormProps> = ({
  userId,
  memory,
}) => {
  const [loading, setLoading] = useState(false)
  const [memoryChanged, setMemoryChanged] = useState(false)

  const [content, setContent] = useState(memory?.content)

  const router = useRouter()

  const isOwner = userId === memory?.userId

  const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = memory?.coverUrl ?? ''

    if (!memoryChanged && fileToUpload) {
      const uploadFormData = new FormData()

      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.cid
    }

    const token = Cookie.get('token')

    if (isOwner && memory) {
      await api.put(
        `/memories/${memory.id}`,
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    } else {
      await api.post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push('/')
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleCreateMemory}
      onChange={() => setMemoryChanged(true)}
      className="flex flex-1 flex-col gap-2"
    >
      {isOwner && (
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value={memory?.isPublic ? 'true' : 'false'}
              defaultChecked={memory?.isPublic}
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            />
            Tornar memória pública
          </label>
        </div>
      )}

      <MediaPicker cid={memory?.coverUrl} />

      <textarea
        name="content"
        spellCheck={false}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isOwner}
        className="w-full flex-1 resize-none border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      {memoryChanged && (
        <button
          type="submit"
          disabled={loading}
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        >
          Salvar
        </button>
      )}
    </form>
  )
}
