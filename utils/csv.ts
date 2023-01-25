import { headerRows } from '~scripts/constants'
import { Item } from '~types/scraper'

export const convertToCsv = (input: Item[]): string => {
  const headerRowData = headerRows.join(',') + '\n'
  const csvData = input.map((item) => Object.values(item).join(',')).join('\n')
  return headerRowData + csvData
}
