# Third-party notices

QA Studio bundles the files below so the app works without calling any third-party server.
Each component keeps its own license; the full texts are in `licenses/`.

| Component | Version | License | File in this folder | SHA-256 of the file as shipped |
|---|---|---|---|---|
| [Lucide](https://lucide.dev) (icons) | 1.16.0 | ISC | `lucide-1.16.0.min.js` | `e045d97f81eb43aebb85fa470c6956b1e4b03bfb5773bb803d4db9a6c23ac327` |
| [Chart.js](https://www.chartjs.org) | 4.4.7 | MIT | `chart-4.4.7.umd.js` | `a8a8394868880f26e315dd16632497b4544e3c799d25510d1086ad117210bf7e` |
| [SheetJS Community Edition](https://sheetjs.com) (Excel export) | 0.18.5 | Apache-2.0 | `xlsx-0.18.5.full.min.js` | `c9506197caf809a075b6dee1da0d36fb19da7158ffe8a88e7b0c96c5d8623c99` |
| [Inter](https://rsms.me/inter/) variable font, latin + latin-ext subsets | 5.3.0 (`@fontsource-variable/inter`) | SIL OFL-1.1 | `fonts/inter-latin-wght-normal.woff2` | `3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62` |
| (same, latin-ext) | | | `fonts/inter-latin-ext-wght-normal.woff2` | `34b9c504cab7a73e37b746343a449132e56cf7b5481af2cb81dc74dcff25c956` |

## How these files were produced

The files are the unmodified `dist` files of the npm packages named above, with one change:
the trailing `//# sourceMappingURL=...` comment was removed, because the source-map files are
not shipped. `inter.css` was written for this project; its `unicode-range` values come from
the `@fontsource-variable/inter` package.

To update a component, install the new version in a temporary folder, copy the file here,
change the version in the file name, in `sw.js` (precache list), and in the page that loads it,
and update this table.

## Known security notes

- SheetJS 0.18.5 is the last version published to npm. Newer fixes are distributed by SheetJS
  directly. QA Studio only **writes** spreadsheets (export) and never parses uploaded
  spreadsheets, which is where the known parsing vulnerabilities apply.
