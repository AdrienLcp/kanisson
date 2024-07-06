import { useParams, useRouter } from 'next/navigation'

import { sleep } from '@/helpers/promise'
import { DEFAULT_LOCALE, getValidLocale } from '@/i18n'
import type { RoutePath } from '@/routes'

type Params = Record<string, string | string[]> | null

const getHrefWithLocale = (params: Params, path: RoutePath) => {
  const locale = getValidLocale(params?.locale)
  return locale === DEFAULT_LOCALE
    ? `${path}`
    : `/${locale}${path}`
}

const PAGE_TRANSITION_DURATION_IN_MS = 300

export type Navigate = (path: RoutePath) => Promise<void>

export const useNavigation = (): Navigate => {
  const params = useParams()
  const router = useRouter()

  const navigate: Navigate = async (path: RoutePath) => {
    const pageWrapper = document.querySelector('.main')

    const href = getHrefWithLocale(params, path)

    if (pageWrapper === null) {
      router.push(href)
      return
    }

    if (!pageWrapper.classList.contains('page-transition')) {
      pageWrapper.classList.add('page-transition')
    }

    await sleep(PAGE_TRANSITION_DURATION_IN_MS)

    router.push(href)

    await sleep(PAGE_TRANSITION_DURATION_IN_MS)

    pageWrapper.classList.remove('page-transition')
  }

  return navigate
}
