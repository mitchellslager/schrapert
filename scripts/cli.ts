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
  limit: number
}

yargs(hideBin(process.argv))
  .options({
    headless: { type: 'boolean', default: true },
    limit: { type: 'number', default: 5 },
  })
  .command(
    'new',
    'Releases from this week',
    () => {},
    (argv) => getLatestReleases(argv)
  )
  .command(
    'back',
    'Releases that are back in stock',
    () => {},
    (argv) => getBackInStock(argv)
  )
  .command(
    'electro',
    'Get releases by genre',
    () => {},
    (argv) => getByGenre(argv)
  )
  .help()
  .demandCommand(1).argv

function getLatestReleases(argv: Arguments) {
  console.log('Get latest releases')
  startBrowser(page.newThisWeek, argv)
}

function getBackInStock(argv: Arguments) {
  console.log('Get back in stock')
  startBrowser(page.backInStock, argv)
}

function getByGenre(argv: Arguments) {
  console.log('Get by genre')
  startBrowser(page.electro, argv)
}
