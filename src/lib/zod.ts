import type { ZodError } from 'zod'

export const getZodErrorMessages = (error: ZodError): string[] => {
  const errorMessages = error.errors.map(error => error.message)
  const uniqueErrorMessages = Array.from(new Set(errorMessages))
  return uniqueErrorMessages
}
