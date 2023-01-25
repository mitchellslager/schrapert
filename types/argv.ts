import { Category } from './scraper'

export interface Arguments {
  [x: string]: unknown
  headless: boolean
  limit: number
  inStockOnly: boolean
}

export interface CategoryArguments extends Arguments {
  category: Category
}

export interface SearchArguments extends Arguments {
  terms: string[]
}
