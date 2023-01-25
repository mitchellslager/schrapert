/**
 * Rush Hour scraper
 * Scrapes the latest releases from https://www.rushhour.nl
 */
import path from 'path'
import { writeFile } from 'fs'
import { hideBin } from 'yargs/helpers'
import chalk from 'chalk'
import yargs from 'yargs/yargs'
import { getCategoryLink, getSearchLink } from '~utils/url'
import { Arguments, CategoryArguments, SearchArguments } from '~types/argv'
import { convertToCsv } from '~utils/csv'
import { Item } from '~types/scraper'
import getReleases, { startBrowser } from './browser'
import { page } from './constants'

yargs(hideBin(process.argv))
  .scriptName('schrapert')
  .options({
    headless: {
      type: 'boolean',
      description: 'Wether to run Puppeteer in headless mode',
      default: true,
    },
    limit: {
      type: 'number',
      description: 'Amount of pages to scrape for paginated results',
      default: 5,
    },
    inStockOnly: {
      type: 'boolean',
      description: 'Filter results that are not in-stock from output',
      alias: 'in-stock-only',
      default: false,
    },
  })
  .command(
    ['new', '$0'],
    'Releases from this week',
    () => {
      // do nothing
    },
    (argv) => getLatestReleases(argv)
  )
  .command(
    'back',
    'Releases that are back in stock',
    () => {
      // do nothing
    },
    (argv) => getBackInStock(argv)
  )
  .command(
    'category <name>',
    'Get releases by category',
    (yargs) => {
      return yargs.positional('category', {
        alias: 'category',
        choices: ['electro', 'detroit'],
        describe: 'Category to search',
        default: 'electro',
      } as const)
    },
    (argv) => getReleasesByCategory(argv)
  )
  .command(
    'search <terms..>',
    'Search for one or more terms, like: "drexciya" "aphex twin"',
    (yargs) => {
      return yargs.positional('terms', {
        coerce: (val: string[]) => val,
        demandOption: true,
      })
    },
    (argv) => getSearchResults(argv)
  )
  .help().argv

async function getLatestReleases(argv: Arguments) {
  console.log(chalk.yellow('Get latest releases'))
  const output = path.resolve('build', 'latest-releases.csv')
  const browser = await startBrowser(argv)
  const releases = await getReleases(page.newThisWeek, argv, browser)
  await browser.close()

  writeFile(output, convertToCsv(releases), (err) => {
    if (err) console.log(err)
    else console.log(chalk.green(`Data has been saved to ${output}`))
  })
}

async function getBackInStock(argv: Arguments) {
  console.log(chalk.yellow('Get back in stock'))
  const output = path.resolve('build', 'back-in-stock.csv')
  const browser = await startBrowser(argv)

  if (browser) {
    const releases = await getReleases(page.backInStock, argv, browser)
    await browser.close()

    writeFile(output, convertToCsv(releases), (err) => {
      if (err) console.log(err)
      else console.log(chalk.green(`Done! Data has been saved to ${output}`))
    })
  }
}

async function getReleasesByCategory(argv: CategoryArguments) {
  console.log(chalk.yellow(`Get by category: ${argv.category}`))
  const link = getCategoryLink(argv.category)
  const output = path.resolve('build', `${argv.category}.csv`)
  const browser = await startBrowser(argv)

  const releases = await getReleases(link, argv, browser)
  await browser.close()

  writeFile(output, convertToCsv(releases), (err) => {
    if (err) console.log(err)
    else console.log(chalk.green(`Done! Data has been saved to ${output}`))
  })
}

async function getSearchResults(argv: SearchArguments) {
  console.log(chalk.yellow(`Get search results for: ${argv.terms.join(', ')}`))
  const output = path.resolve('build', 'search-results.csv')
  const releases: Item[] = []
  const browser = await startBrowser(argv)

  for (const term of argv.terms) {
    const link = getSearchLink(term)
    const result = await getReleases(link, argv, browser)
    releases.push(...result)
  }

  await browser.close()

  writeFile(output, convertToCsv(releases), (err) => {
    if (err) console.log(err)
    else console.log(chalk.green(`\nDone! Data has been saved to ${output}`))
  })
}
