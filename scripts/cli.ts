/**
 * Rush Hour scraper
 * Scrapes the latest releases from https://www.rushhour.nl
 */
import { parse } from 'node-html-parser'
import chalk from 'chalk'
import { selectors, urls } from './constants'

const fetchNewThisWeek = () => {
  getPageContent(urls.newThisWeek)
}

const getPageContent = async (url: string) => {
  try {
    // Fetch URL and parse HTML with node-html-parser
    const res = await fetch(url)
    const body = await res.text()
    const parsed = parse(body)

    // Select all relevant items on the page
    const view = parsed.querySelector(selectors.view)
    const nextPage = parsed.querySelector(selectors.nextPage)?.attributes.href
    const items = view?.querySelectorAll(selectors.item)

    // Log the artist and album title in the console
    items?.forEach((item) => {
      const artist = item.querySelector(selectors.artist)?.text.toString()
      const title = item.querySelector(selectors.title)?.text.toString()
      console.log(`${chalk.blue(artist)} - ${chalk.red(title)}`)
    })

    if (!nextPage) {
      return
    }

    getPageContent(`${urls.base}${nextPage}`)
  } catch (err) {
    console.log(err)
  }
}

fetchNewThisWeek()
