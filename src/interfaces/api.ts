import type { paths } from './api-types'

export type RequestBody<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  requestBody: { content: { 'application/json': infer R } }
}
  ? R
  : never

export type ResponseBody<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  responses: { 200: { content: { 'application/json': infer R } } }
}
  ? R
  : never
