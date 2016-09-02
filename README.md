# Autocomplete Primer

[![apm Version](https://img.shields.io/apm/v/autocomplete-primer.svg?maxAge=2592000)](https://atom.io/packages/autocomplete-primer)
[![apm Downloads](https://img.shields.io/apm/dm/autocomplete-primer.svg?maxAge=2592000)](https://atom.io/packages/autocomplete-primer)

> An atom autocomplete-plus package that autocompletes various primer packages.

![completing](https://cloud.githubusercontent.com/assets/54012/18205369/a41bdba8-70ef-11e6-86ec-89fdcaed1fab.gif)

## Install

Install autocomplete-primer using [Atom's package manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or simply enter this into your terminal.

```
$ apm install autocomplete-primer
```

## Usage & Features

This package uses the api from [autocomplete-plus](https://github.com/atom/autocomplete-plus), which is bundled with atom, to display autocomplete results from primer projects.

- Autocomplete [primer-utilities](https://github.com/primer/utilities) with hints and documentation links
- Autocomplete octicon helper tags into `.erb` files and `.rb`
- **Coming soon** Autocomplete component example snippets

## Development

This package works by pulling in the primer packages and building them into the necessary data structure for the autocomplete-plus api. To build this, run

```
npm run build
```

## License

[MIT](./LICENSE) &copy; [GitHub](https://github.com/)
