import { page } from '../scripts/constants'

export function getCategoryLink(name: string) {
  return page[name]
}

export function getSearchLink(query: string) {
  return page.search + query
}
