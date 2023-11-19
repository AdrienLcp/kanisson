import { K2D, Neuton } from 'next/font/google'

export const headingFont = Neuton({
  subsets: ['latin'],
  weight: ['200', '300', '400', '700', '800'],
  variable: '--font-heading'
})

export const bodyFont = K2D({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-body'
})
