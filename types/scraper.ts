export type Category = 'electro' | 'detroit'

export type Item = {
  artist: string
  title: string
  available: Availability
}

export type Availability = 'yes' | 'no' | 'pre-order'
