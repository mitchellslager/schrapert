/**
 * Command-line interface script
 */
import { parse } from 'node-html-parser'
import chalk from 'chalk'

const fetchNewThisWeek = async () => {
  try {
    // Fetch URL and parse HTML with node-html-parser
    const res = await fetch('https://www.rushhour.nl/new-this-week')
    const body = await res.text()
    const parsed = parse(body)

    // Select all relevant items on the page
    const view = parsed.querySelector('.record-grid-view > .view-content')
    const items = view?.querySelectorAll('.node-record')

    // Log the artist and album title in the console
    items?.forEach((item) => {
      const artist = item.querySelector('.field-name-field-artist')?.text.toString()
      const title = item.querySelector('.field-name-title')?.text.toString()
      console.log(`${chalk.blue(artist)} - ${chalk.red(title)}`)
    })
  } catch (error) {
    console.log(error)
  }
}

// const getPageContent = async (url: string) => {
//   try {
//   } catch (err) {
//     console.log(err)
//   }
// }

fetchNewThisWeek()
