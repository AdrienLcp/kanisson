'use client'

import React from 'react'
import toast from 'react-hot-toast'

export type ValidationErrors <T extends string> = Record<T, string[]> & { server: string[] } | undefined

export function useValidationErrors <T extends string> (initialValidationErrors?: ValidationErrors<T>) {
  const [validationErrors, setValidationErrors] = React.useState<ValidationErrors<T>>(initialValidationErrors)

  React.useEffect(() => {
    if (validationErrors !== undefined) {
      validationErrors.server.forEach(error => toast.error(error))
    }
  }, [validationErrors])

  return [validationErrors, setValidationErrors] as const
}
