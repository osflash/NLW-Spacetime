import { FastifyInstance } from 'fastify'
import { storage } from '../services/storage'
import { Blob } from 'nft.storage'

export const uploadRoutes = async (app: FastifyInstance) => {
  app.post('/upload', async (request, reply) => {
    const upload = await request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!upload) {
      return reply.status(400).send()
    }

    const buffer = await upload.toBuffer()

    const file = new Blob([new Uint8Array(buffer).buffer])

    const cid = await storage.storeBlob(file)

    return { cid }
  })
}
