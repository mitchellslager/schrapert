/**
 * Rush Hour scraper
 * Scrapes the latest releases from https://www.rushhour.nl
 */
import startBrowser from './browser'
import { page } from './constants'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

export interface Arguments {
  [x: string]: unknown
  headless: boolean
}

const parser = yargs(hideBin(process.argv)).options({
  headless: { type: 'boolean', default: true },
})

async function app() {
  const argv = await parser.argv
  startBrowser(page.electro, argv)
}

app()
