/**
 * Constants
 * Collection of URLs and CSS selectors.
 */
const baseUrl = 'https://www.rushhour.nl'

export const page = {
  backInStock: `${baseUrl}/mailqueue/2591`,
  detroit: `${baseUrl}/search?genre=1641`,
  electro: `${baseUrl}/search?genre=1651`,
  newThisWeek: `${baseUrl}/new-this-week`,
}

export const selectors = {
  addToCartButton: '[id^="order-button"]',
  artist: '.field-name-field-artist',
  nextPage: '.pager-next > a',
  product: '.view-mode-search_index',
  title: '.field-name-title',
  view: '.view',
}
