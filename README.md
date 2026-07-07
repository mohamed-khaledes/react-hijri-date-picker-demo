# React Hijri Date Picker — Demo

An interactive showcase for [**@mk01/react-hijri-date-picker**][npm] — an
accurate, accessible, zero-dependency Hijri (Islamic) date picker for React.

🔗 **Live demo:** https://mohamed-khaledes.github.io/react-hijri-date-picker-demo/
📦 **Package on npm:** https://www.npmjs.com/package/@mk01/react-hijri-date-picker

> The demo uses the latest stable release, **v2.0.0**. See [`DOCS.md`](DOCS.md)
> for the full package documentation (API, props, exports, theming).

## What it demonstrates

Every example is a live picker with a **Preview / Code** tab switcher — flip to
**Code** and hit **Copy** to grab a self-contained, copy-paste-runnable snippet
for that feature. There's also a light/dark theme toggle in the top bar.

**Selection modes**
- Single date (default) with numbered months and a configurable
  months-per-row month grid
- Range selection (`mode="range"`)
- Multiple selection (`mode="multiple"`)

**Accurate calendar engine**
- Calendar variants — `umalqura` (default) · `civil` · `tabular`, with a live
  comparison of how today maps in each
- Day adjustment (`dayAdjustment`) for local moon-sighting offsets
- Dual calendar cells (`showGregorianDates`) + Gregorian equivalent footer
- Arabic locale with the Gregorian equivalent

**Localization**
- Automatic RTL layout and Arabic-Indic numerals for `locale="ar"`, plus a
  `numerals="latn"` override
- Full custom localization via `labels` (Turkish month/weekday names)

**Restrictions & validation**
- `minDate` / `maxDate`, `disabledDates`, `highlightedDates`
- Dynamic disabling via `shouldDisableDate` (e.g. disable every Friday)
- Manual typed input with format-aware parsing

**Display & rendering**
- Custom colors via the `customColors` prop
- CSS-variable theming (`--hijri-dp-*`) with no props
- Portal popup that escapes `overflow: hidden` containers
- Inline (always-visible) calendar, shown LTR and RTL side by side

**Forms, refs & accessibility**
- Imperative handle (`ref.open()` / `close()` / `clear()`)
- Native form integration (`name`, `required`, `error`)
- Disabled state
- Full keyboard support (arrows, Home/End, PageUp/PageDown, Enter, Escape)

## New in v2

- Accurate Umm al-Qura / civil / tabular conversion via built-in `Intl` (real
  29/30-day months), replacing v1's drifting approximation
- Range and multiple selection modes
- `numberedMonths` — prefixes month names with their number ("1- Muharram") in
  the header and the month grid
- `monthsPerRow` — controls the month-picker grid columns (1–4, default 2)

See the [full documentation](DOCS.md) and the ["Migrating from v1"](DOCS.md#migrating-from-v1)
notes.

## Run it locally

```bash
npm install
npm run dev      # start the Vite dev server
```

Then open the printed local URL.

```bash
npm run build    # type-check (tsc -b) and build for production
npm run preview  # preview the production build
```

## Tech

React 19 · TypeScript · Vite. The demo lives in
[`src/demo/index.tsx`](src/demo/index.tsx) and
[`src/demo/demo.css`](src/demo/demo.css).

## License

MIT

[npm]: https://www.npmjs.com/package/@mk01/react-hijri-date-picker
