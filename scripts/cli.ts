/**
 * Rush Hour scraper
 * Scrapes the latest releases from https://www.rushhour.nl
 */
import { writeFile } from 'node:fs'
import { parse } from 'node-html-parser'
import chalk from 'chalk'
import { selectors, urls } from './constants'

type Item = {
  artist: string
  title: string
  available: boolean
}

const fetchNewThisWeek = async () => {
  const content = await getAllPageContent(urls.newThisWeek)
  console.log(content)

  // writeFile('data.txt', 'sdfs', () => console.log('test'))
}

const getAllPageContent = async (url: string) => {
  let arr: Item[] = []

  try {
    // Fetch URL and parse HTML with node-html-parser
    const res = await fetch(url)
    const body = await res.text()
    const parsed = parse(body)

    // Select all relevant items on the page
    const view = parsed.querySelector(selectors.view)
    const nextPage = parsed.querySelector(selectors.nextPage)?.attributes.href
    const items = view?.querySelectorAll(selectors.item)

    // Save object in array
    items?.forEach((item) => {
      const artist = item.querySelector(selectors.artist)?.text.toString()
      const title = item.querySelector(selectors.title)?.text.toString()
      // const available = item.querySelector(selectors.addToCartButton)

      if (artist && title) {
        arr.push({ artist, title, available: true })
      }
    })

    if (!nextPage) {
      console.log(chalk.red('Done! No more pages to scrape.'))
      return arr
    }

    const content = await getAllPageContent(`${urls.base}${nextPage}`)
    arr.push(...content)
  } catch (err) {
    console.log(err)
  }

  return arr
}

fetchNewThisWeek()
