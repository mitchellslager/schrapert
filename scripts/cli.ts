/**
 * Rush Hour scraper
 * Scrapes the latest releases from https://www.rushhour.nl
 */
import { writeFile } from 'node:fs'
import { parse } from 'node-html-parser'
import chalk from 'chalk'
import { selectors, urls } from './constants'
import startBrowser from './browser'

type Item = {
  artist: string
  title: string
  available: boolean
}

const fetchNewThisWeek = async () => {
  startBrowser()
  // const content = await getAllPageContent(urls.newThisWeek)
  // console.log(content)

  // writeFile('data.txt', 'sdfs', () => console.log('test'))
}

fetchNewThisWeek()
