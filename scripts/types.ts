export type Category = 'electro' | 'detroit'

export interface Arguments {
  [x: string]: unknown
  headless: boolean
  limit: number
}

export interface CategoryArguments extends Arguments {
  category: Category
}

export interface SearchArguments extends Arguments {
  terms: string[]
}

export type Item = {
  artist: string
  title: string
  available: Availability
}

export type Availability = 'yes' | 'no' | 'pre-order'
