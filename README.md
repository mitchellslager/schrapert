# Schrapert

Scrape releases from my favourite record store.

## Installation

```
npm i -g schrapert
```

## Usage

There are several commands you can use.

Get releases from the "New this week" page.

```
schrapert
```

Get releases from the "Back in stock" page.

```
schrapert back
```

Get releases for a category.
The full list of available categories can be found here...

```
schrapert category <name>
```

Get releases for one or more search terms. Enclose each term in double quotes.

```
schrapert search <term..>
```

For each command, a CSV file will be generated with the scraped data.
