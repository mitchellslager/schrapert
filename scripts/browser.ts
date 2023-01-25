import { launch, Browser, ElementHandle } from 'puppeteer'
import { Arguments } from '~types/argv'
import { getAvailability } from '~utils/availability'
import { Item } from '~types/scraper'
import { selectors } from './constants'

export async function startBrowser({ headless }: Arguments) {
  const browser = await launch({ headless })
  return browser
}

async function getReleases(url: string, { limit, inStockOnly }: Arguments, browser: Browser) {
  const page = await browser.newPage()
  await page.goto(url)

  const arr: Item[] = []

  for (let i = 0; i < limit; i++) {
    const view = await page.waitForSelector(selectors.view)
    const nextPage = await page?.$(selectors.nextPage)
    const items = await view?.$$(selectors.product)

    console.log(`Now scraping from:`, page.url())

    if (items) arr.push(...(await getReleasesFromPage(items, inStockOnly)))

    if (nextPage) {
      await nextPage.click()
    } else break
  }

  return arr
}

const getReleasesFromPage = async (
  items: ElementHandle<Element>[],
  inStockOnly: boolean
): Promise<Item[]> => {
  const releases: Item[] = []

  for (const item of items) {
    const artist = await item
      .waitForSelector(selectors.artist)
      .then((res) => res?.evaluate((node) => node.textContent))

    const title = await item
      .waitForSelector(selectors.title)
      .then((res) => res?.evaluate((node) => node.textContent))

    const availability = await item
      .waitForSelector(selectors.addToCartButton)
      .then((res) => res?.evaluate((node) => node.textContent))

    const available = getAvailability(availability?.toLowerCase())

    if (artist && title) {
      if (inStockOnly) {
        if (available === 'yes') {
          releases.push({ artist, title, available })
        }
      } else {
        releases.push({ artist, title, available })
      }
    }
  }

  return releases
}

export default getReleases
