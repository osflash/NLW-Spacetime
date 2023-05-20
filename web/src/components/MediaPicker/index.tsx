'use client'

import React, { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  cid?: string
}

export const MediaPicker: React.FC<MediaPickerProps> = ({ cid }) => {
  const [preview, setPreview] = useState<string | null>(
    cid ? `https://cloudflare-ipfs.com/ipfs/${cid}` : null,
  )

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
