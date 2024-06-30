export type ValidationErrors <T extends string> = Record<T, string[]> & { errors: string[] } | undefined

export type CommonFormFieldProps = {
  /** Description to display below the input. */
  description?: React.ReactNode

  /** Whether the field has error. */
  hasError?: boolean

  /** Label to display above the input. */
  label?: React.ReactNode

  /** Placeholder text to display in the input. */
  placeholder?: string
}
