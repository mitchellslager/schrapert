import { Availability } from '../scripts/types'

export function getAvailability(label?: string) {
  const mapping: { [key: string]: Availability } = {
    'out of stock': 'no',
    'add to cart': 'yes',
    'pre order': 'pre-order',
  }

  return label ? mapping[label] ?? 'no' : 'no'
}
