import chalk from 'chalk'
import { writeFile } from 'fs'
import path from 'path'
import puppeteer, { ElementHandle } from 'puppeteer'
import { Availability, getAvailability } from '../utils/availability'
import { Arguments } from './cli'
import { selectors } from './constants'

type Item = {
  artist: string
  title: string
  available: Availability
}

async function startBrowser(url: string, argv: Arguments) {
  const browser = await puppeteer.launch({ headless: argv.headless })
  const page = await browser.newPage()
  await page.goto(url)
  await page.setViewport({ width: 1080, height: 1024 })

  const arr: Item[] = []

  for (let i = 0; i < argv.limit; i++) {
    const view = await page.waitForSelector(selectors.view)
    const nextPage = await page?.$(selectors.nextPage)
    const items = await view?.$$(selectors.product)

    console.log(chalk.yellow(`Now scraping from:`, page.url()))

    if (items) arr.push(...(await getReleasesFromPage(items)))

    if (nextPage) {
      await nextPage.click()
    } else break
  }

  await browser.close()

  console.log(chalk.green('Done. No more pages to scrape!'))

  // Transform data to CSV and write to file
  const headerRowData = ['artist', 'title', 'available'].join(',') + '\n'
  const csvData = arr.map((item) => Object.values(item).join(',')).join('\n')

  const output = path.resolve('build', 'data.csv')

  writeFile(output, headerRowData + csvData, (err) => {
    if (err) console.log(err)
    else console.log(chalk.green(`Data has been saved to ${output}`))
  })
}

const getReleasesFromPage = async (items: ElementHandle<Element>[]): Promise<Item[]> => {
  const releases: Item[] = []

  for (const item of items) {
    const artist = await item
      .waitForSelector(selectors.artist)
      .then((res) => res?.evaluate((node) => node.textContent))

    const title = await item
      .waitForSelector(selectors.title)
      .then((res) => res?.evaluate((node) => node.textContent))

    const available = await item
      .waitForSelector(selectors.addToCartButton)
      .then((res) => res?.evaluate((node) => node.textContent))

    if (artist && title) {
      releases.push({ artist, title, available: getAvailability(available?.toLowerCase()) })
    }
  }

  return releases
}

export default startBrowser
