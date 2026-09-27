import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// In production Vercel serves api/*.ts as serverless functions. This plugin
// does the same during `npm run dev`, so the feedback API works without the
// Vercel CLI. It adds just enough of Vercel's req/res helpers for our handlers.
function vercelApiDev(): Plugin {
  return {
    name: 'vercel-api-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      for (const [key, value] of Object.entries(env)) process.env[key] ??= value

      server.middlewares.use('/api', async (req, res, next) => {
        const route = (req.url ?? '').split('?')[0].replace(/^\/+|\/+$/g, '')
        if (!route) return next()

        let handler
        try {
          handler = (await server.ssrLoadModule(`/api/${route}.ts`)).default
        } catch {
          return next()
        }

        let raw = ''
        for await (const chunk of req) raw += chunk
        let body: unknown = raw
        try {
          body = raw ? JSON.parse(raw) : undefined
        } catch {
          // leave non-JSON bodies as a string, like Vercel does
        }

        const vercelRes = Object.assign(res, {
          status(code: number) {
            res.statusCode = code
            return vercelRes
          },
          json(data: unknown) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
            return vercelRes
          },
          send(data: unknown) {
            res.end(typeof data === 'string' ? data : JSON.stringify(data))
            return vercelRes
          },
        })

        try {
          await handler(Object.assign(req, { body }), vercelRes)
        } catch (err) {
          server.config.logger.error(`[api/${route}] ${String(err)}`)
          if (!res.headersSent) vercelRes.status(500).json({ error: 'Internal error in API route.' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDev()],
})
