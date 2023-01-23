export type Available = 'yes' | 'no' | 'pre-order'

export function getAvailability(text?: string) {
  const mapping: { [key: string]: Available } = {
    'out of stock': 'no',
    'add to cart': 'yes',
    'pre order': 'pre-order',
  }

  return text ? mapping[text] ?? 'no' : 'no'
}
