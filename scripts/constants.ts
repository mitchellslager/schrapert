/**
 * Constants
 * Collection of URLs and CSS selectors.
 */
const baseUrl = 'https://www.rushhour.nl'

export const page = {
  newThisWeek: `${baseUrl}/new-this-week`,
  backInStock: `${baseUrl}/mailqueue/2591`,
  electro: `${baseUrl}/search?genre=1651`,
}

export const selectors = {
  view: '.record-grid-view > .view-content',
  item: '.node-record',
  artist: '.field-name-field-artist',
  title: '.field-name-title',
  addToCartButton: '[id^="order-button"]',
  nextPage: '.pager-next > a',
}
