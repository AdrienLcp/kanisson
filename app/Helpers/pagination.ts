import type { PaginationResponse } from '@/Types'

export const getDefaultPagination = (count: number): PaginationResponse => {
  return {
    page: 1,
    total: count,
    limit: count
  }
}
