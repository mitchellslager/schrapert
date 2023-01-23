export type Availability = 'yes' | 'no' | 'pre-order'

export function getAvailability(text?: string) {
  const mapping: { [key: string]: Availability } = {
    'out of stock': 'no',
    'add to cart': 'yes',
    'pre order': 'pre-order',
  }

  return text ? mapping[text] ?? 'no' : 'no'
}
