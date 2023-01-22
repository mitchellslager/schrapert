import puppeteer, { ElementHandle } from 'puppeteer'
import { selectors, urls } from './constants'

type Item = {
  artist: string
  title: string
  available: boolean
}

async function startBrowser() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(urls.newThisWeek)

  await page.setViewport({ width: 1080, height: 1024 })

  // Query for an element handle.
  const view = await page.waitForSelector(selectors.view)
  const nextPage = await page?.$(selectors.nextPage)
  const items = await view?.$$(selectors.item)

  // console.log(items)
  const arr: Item[] = []
  if (items) {
    for (const item of items) {
      const artist = await item
        .waitForSelector(selectors.artist)
        .then((res) => res?.evaluate((node) => node.textContent))

      const title = await item
        .waitForSelector(selectors.title)
        .then((res) => res?.evaluate((node) => node.textContent))

      const available = await item.$(selectors.addToCartButton)

      if (artist && title) {
        arr.push({ artist, title, available: Boolean(available) })
      }
    }
  }

  console.log(arr)

  if (nextPage) {
    nextPage.click()
  }

  // await browser.close()
}

const getPageContent = (items: ElementHandle<Element>[]) => {
  //
}

export default startBrowser
