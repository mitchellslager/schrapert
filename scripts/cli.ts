/**
 * Rush Hour scraper
 * Scrapes the latest releases from https://www.rushhour.nl
 */
import startBrowser from './browser'
import { page } from './constants'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { getCategoryLink } from '../utils/url'
import { Arguments, CategoryArguments, SearchArguments } from './types'

yargs(hideBin(process.argv))
  .scriptName('schrapert')
  .options({
    headless: { type: 'boolean', default: true },
    limit: { type: 'number', default: 5 },
  })
  .command(
    ['new', '$0'],
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
    'category [category]',
    'Get releases by category',
    (yargs) => {
      return yargs.positional('category', {
        choices: ['electro', 'detroit'],
        describe: 'Category to search',
        default: 'electro',
      } as const)
    },
    (argv) => getReleasesByCategory(argv)
  )
  .command(
    'search [terms..]',
    'Multi-term search and save what in stock only',
    (yargs) => {
      return yargs.positional('terms', {
        coerce: (val: string[]) => val,
        demandOption: true,
      })
    },
    (argv) => getSearchResults(argv)
  )
  .help().argv

function getLatestReleases(argv: Arguments) {
  console.log('Get latest releases')
  startBrowser(page.newThisWeek, argv)
}

function getBackInStock(argv: Arguments) {
  console.log('Get back in stock')
  startBrowser(page.backInStock, argv)
}

function getReleasesByCategory(argv: CategoryArguments) {
  console.log(`Get by category: ${argv.category}`)
  const link = getCategoryLink(argv.category)
  startBrowser(link, argv)
}

function getSearchResults(argv: SearchArguments) {
  console.log(`Get search results for: ${argv.terms}`)
}
