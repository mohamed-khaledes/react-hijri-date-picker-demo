# @mk01/react-hijri-date-picker — Documentation

Full documentation for **@mk01/react-hijri-date-picker** `v2.0.0` — an accurate,
accessible, zero-dependency Hijri (Islamic) date picker for React.

- 📦 npm: https://www.npmjs.com/package/@mk01/react-hijri-date-picker
- 🧪 Live demo: https://mohamed-khaledes.github.io/react-hijri-date-picker-demo/
- 🗂 Source: https://github.com/mohamed-khaledes/react-hijri-date-picker

Conversion is powered by the JavaScript engine's built-in `Intl` Islamic
calendars, so dates match the official **Umm al-Qura** calendar (with **civil**
and **tabular** variants also available), including real 29/30-day month
lengths — no lookup tables shipped, zero runtime dependencies.

---

## Table of contents

- [Installation](#installation)
- [Quick start](#quick-start)
- [Value & date format](#value--date-format)
- [Selection modes](#selection-modes)
- [Calendar accuracy](#calendar-accuracy)
- [Localization](#localization)
- [Restrictions & validation](#restrictions--validation)
- [Display & rendering](#display--rendering)
- [Theming](#theming)
- [Forms](#forms)
- [Imperative handle](#imperative-handle)
- [Keyboard & accessibility](#keyboard--accessibility)
- [Props reference](#props-reference)
- [Utility exports (calendar engine)](#utility-exports-calendar-engine)
- [Types](#types)
- [SSR / Next.js](#ssr--nextjs)
- [Browser support](#browser-support)
- [Migrating from v1](#migrating-from-v1)
- [License](#license)

---

## Installation

```bash
npm install @mk01/react-hijri-date-picker
# or
yarn add @mk01/react-hijri-date-picker
# or
pnpm add @mk01/react-hijri-date-picker
```

Peer dependencies: `react >= 17` and `react-dom >= 17`.

**No CSS import is required** — styles are self-contained. (There is no
`./dist/index.css` export.)

---

## Quick start

```tsx
import { useState } from 'react'
import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function App() {
  const [date, setDate] = useState('1447-01-15')

  return (
    <HijriDatePicker
      value={date}
      onChange={(value, gregorian, hijri) => {
        setDate(value)
        // value: "1447-01-15"
        // gregorian: Date (UTC midnight)
        // hijri: { hy: 1447, hm: 1, hd: 15 } | null
      }}
      placeholder="Select date"
    />
  )
}
```

Both **controlled** (`value` + `onChange`) and **uncontrolled** (`defaultValue`)
usage are supported.

---

## Value & date format

- The **value is always an ISO Hijri string** `YYYY-MM-DD` (e.g. `1447-01-15`),
  regardless of the `format` you display.
- `format` controls only how the date is **displayed** in the input and, for
  manual input, how typed text is **parsed**:

  | `format`        | Example            |
  | --------------- | ------------------ |
  | `YYYY-MM-DD`    | `1447-01-15`       |
  | `D MMMM YYYY`   | `15 Muharram 1447` |
  | `DD/MM/YYYY`    | `15/01/1447`       |
  | `MM/DD/YYYY`    | `01/15/1447`       |

- Every Gregorian `Date` produced or consumed by the library is **UTC midnight**
  of the day in question.
- The `HijriDate` object is `{ hy, hm, hd }` — Hijri year, month (1–12), day
  (1–30).

---

## Selection modes

The `mode` prop switches the shape of `value` / `defaultValue` / `onChange`.

### Single (default)

```tsx
<HijriDatePicker
  mode="single" // optional; default
  value="1447-01-15"
  onChange={(value, gregorianDate, hijriDate) => {}}
/>
```

`onChange(value: string, gregorianDate?: Date, date?: HijriDate | null)`

### Range

```tsx
const [range, setRange] = useState<HijriRangeValue>(['1447-01-10', '1447-01-20'])

<HijriDatePicker
  mode="range"
  value={range}
  onChange={(value, gregorianDates) => setRange(value)}
/>
```

`value` is `[string | null, string | null]`.
`onChange(value: HijriRangeValue, gregorianDates?: [Date | null, Date | null])`

### Multiple

```tsx
const [dates, setDates] = useState<string[]>(['1447-01-10', '1447-01-12'])

<HijriDatePicker
  mode="multiple"
  value={dates}
  onChange={(value, gregorianDates) => setDates(value)}
/>
```

`value` is `string[]`.
`onChange(value: string[], gregorianDates?: Date[])`

> `allowManualInput` applies to **single mode** only.

---

## Calendar accuracy

### Variants

```tsx
<HijriDatePicker calendar="umalqura" /> // default — official Saudi calendar
<HijriDatePicker calendar="civil" />    // tabular civil (Friday epoch)
<HijriDatePicker calendar="tabular" />  // tabular (Thursday epoch)
```

The same Gregorian day can map to a different Hijri day across variants.

### Moon-sighting adjustment

Some regions begin a month a day earlier/later than the tables. Shift the whole
calendar by whole days with `dayAdjustment`:

```tsx
<HijriDatePicker dayAdjustment={1} /> // local sighting one day ahead
```

`+1` means the local Hijri month started one day earlier than the tables say.

---

## Localization

```tsx
<HijriDatePicker
  locale="ar"          // 'en' (default) | 'ar'
  dir="auto"           // 'ltr' | 'rtl' | 'auto' (default follows locale)
  numerals="arab"      // 'latn' | 'arab' (default 'arab' when locale="ar")
  format="D MMMM YYYY"
/>
```

- `locale="ar"` automatically enables **RTL layout** and **Arabic-Indic digits**
  (`١٤٤٧`). Force Latin digits with `numerals="latn"`.
- Manual input accepts Arabic-Indic and Persian digits and normalizes them.

### Custom localization (`labels`)

Override any built-in string — useful for languages beyond `en`/`ar`:

```tsx
<HijriDatePicker
  labels={{
    months: ['Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir', 'Cemaziyelevvel',
      'Cemaziyelahir', 'Recep', 'Şaban', 'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'],
    weekdays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    today: 'Bugün',
    clear: 'Temizle',
  }}
/>
```

All `labels` keys (all optional, `Partial<HijriDatePickerLabels>`):

| Key             | Meaning                                        |
| --------------- | ---------------------------------------------- |
| `months`        | 12 month names, Muharram first                 |
| `weekdays`      | 7 short weekday labels, Sunday first           |
| `weekdaysLong`  | 7 full weekday names (screen readers)          |
| `today`         | "Today" button                                 |
| `clear`         | "Clear" button                                 |
| `gregorian`     | Label for the Gregorian equivalent footer      |
| `weekColumn`    | Header for the week-number column              |
| `previousLabel` | Previous-month button aria-label               |
| `nextLabel`     | Next-month button aria-label                   |
| `openCalendar`  | Input aria-label to open the calendar          |
| `chooseMonth`   | Header aria-label in day view (zoom to months) |
| `chooseYear`    | Header aria-label in month view (zoom to years)|

---

## Restrictions & validation

```tsx
<HijriDatePicker
  minDate="1447-01-01"                 // inclusive lower bound
  maxDate="1447-12-29"                 // inclusive upper bound
  disabledDates={['1447-01-15']}       // specific unselectable dates
  highlightedDates={['1447-01-27']}    // outlined dates
  shouldDisableDate={(hijri, gregorian) => gregorian.getUTCDay() === 5} // no Fridays
/>
```

- `shouldDisableDate(date: HijriDate, gregorian: Date) => boolean` runs per cell.
- Month lengths are real: day 30 of a 29-day month is invalid and rejected, even
  for controlled values.

---

## Display & rendering

```tsx
<HijriDatePicker
  inline                       // always-visible calendar, no input
  portal                       // render popup into document.body (or an element)
  popupPosition="auto"         // 'bottom' | 'top' | 'auto' (auto flips to fit)
  showGregorianDates           // Gregorian day number inside each cell
  showGregorianEquivalent      // Gregorian date in the footer
  showWeekNumbers              // week-of-year column
  showTodayButton              // "Today" button (default true)
  showTodayIndicator           // outline today's cell (default true)
  firstDayOfWeek={1}           // 0=Sun … 6=Sat (default 0)
  numberedMonths               // "1- Muharram" in header + month grid
  monthsPerRow={3}             // month-grid columns 1–4 (default 2)
  closeOnSelect={true}         // close after selecting (default true)
  optionsStartYear={1400}      // first year in the year view (inclusive)
  optionsEndYear={1480}        // last year in the year view (inclusive)
/>
```

- **`portal`** lets the popup escape `overflow: hidden` / `overflow: auto`
  ancestors (tables, modals). Pass `true` for `document.body`, or a specific
  `HTMLElement`.
- **`popupPosition="auto"`** flips the popup above the input when there isn't
  enough room below.
- Navigate months/years by **clicking the header title** (day → month → year
  zoom); the old `<select>` dropdowns were removed in v2.
- `optionsStartYear` / `optionsEndYear` default to current year −100 / +20 and
  are **inclusive**.

### Custom day rendering

```tsx
<HijriDatePicker
  customDayRenderer={(day, date) => (
    <span title={`${date.hy}-${date.hm}-${date.hd}`}>{day}</span>
  )}
/>
```

`customDayRenderer(day: number, date: HijriDate) => React.ReactNode`

### Navigation callback

```tsx
<HijriDatePicker onMonthChange={(hy, hm) => console.log('viewing', hy, hm)} />
```

Also available: `onOpen()`, `onClose()`.

---

## Theming

### Built-in themes + per-color overrides

```tsx
<HijriDatePicker
  theme="dark"                 // 'light' | 'dark' | 'custom'
  customColors={{ primary: '#10b981', selected: '#059669' }}
/>
```

`customColors` (`HijriDatePickerColors`, all optional):
`primary`, `background`, `text`, `border`, `hover`, `selected`, `selectedText`,
`disabled`, `range`, `error`.

### CSS variables (no props)

Set any of these on an ancestor element — they win without passing props:

```css
.my-app {
  --hijri-dp-primary: #10b981;
  --hijri-dp-background: #0f172a;
  --hijri-dp-text: #f1f5f9;
  --hijri-dp-border: #334155;
  --hijri-dp-hover: #1e293b;
  --hijri-dp-selected: #059669;
  --hijri-dp-selected-text: #ffffff;
  --hijri-dp-disabled: #64748b;
  --hijri-dp-range: rgb(16 185 129 / 0.18);
  --hijri-dp-error: #f87171;
  --hijri-dp-focus-ring: rgb(16 185 129 / 0.3);
}
```

### Class hooks

`className`, `containerClassName`, `inputClassName`, `popupClassName` are applied
to the respective elements for custom styling.

---

## Forms

The picker renders a real `<input>`, so it works with native forms and form
libraries:

```tsx
<form onSubmit={onSubmit}>
  <HijriDatePicker
    name="appointment"   // FormData key
    id="appointment"
    required             // native required validation
    error={hasError}     // render the input in an error state
    autoFocus
  />
  <button type="submit">Submit</button>
</form>
```

> There is **no** default `name` attribute in v2 — pass `name` explicitly to
> include the value in `FormData`.

---

## Imperative handle

Attach a `ref` typed as `HijriDatePickerHandle` to control the picker
programmatically:

```tsx
import { useRef } from 'react'
import HijriDatePicker, { type HijriDatePickerHandle } from '@mk01/react-hijri-date-picker'

function Example() {
  const ref = useRef<HijriDatePickerHandle>(null)
  return (
    <>
      <HijriDatePicker ref={ref} />
      <button onClick={() => ref.current?.open()}>Open</button>
      <button onClick={() => ref.current?.close()}>Close</button>
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref.current?.clear()}>Clear</button>
    </>
  )
}
```

| Member    | Type                       | Description                    |
| --------- | -------------------------- | ------------------------------ |
| `open()`  | `() => void`               | Open the popup                 |
| `close()` | `() => void`               | Close the popup                |
| `focus()` | `() => void`               | Focus the input                |
| `clear()` | `() => void`               | Clear the current selection    |
| `input`   | `HTMLInputElement \| null` | The underlying input (readonly)|

---

## Keyboard & accessibility

The calendar is a `dialog` containing a `grid`, with roving `tabindex` and live
month announcements for screen readers.

| Key                              | Action                                   |
| -------------------------------- | ---------------------------------------- |
| `Enter` / `Space` / `↓` on input | Open the calendar                        |
| Arrow keys                       | Move focus by day / week                 |
| `Home` / `End`                   | Start / end of the week                  |
| `PageUp` / `PageDown`            | Previous / next month                    |
| `Shift` + `PageUp` / `PageDown`  | Previous / next year                     |
| `Enter` / `Space` on a day       | Select the focused day                   |
| `Escape`                         | Close and return focus to the input      |

Additional a11y: pass `aria-label` for an accessible name; the input reflects
`disabled`, `readOnly`, `required`, and `error` states.

---

## Props reference

### Value & selection

| Prop           | Type                                                            | Default        | Description                                     |
| -------------- | -------------------------------------------------------------- | -------------- | ----------------------------------------------- |
| `mode`         | `'single' \| 'range' \| 'multiple'`                            | `'single'`     | Selection mode; changes `value`/`onChange` shape|
| `value`        | `string` / `[string\|null, string\|null]` / `string[]`         | —              | Controlled value (shape follows `mode`)         |
| `defaultValue` | same as `value`                                                | —              | Uncontrolled initial value                      |
| `onChange`     | see [Selection modes](#selection-modes)                        | —              | Fires with formatted value(s) + Gregorian date(s)|
| `format`       | `'YYYY-MM-DD' \| 'D MMMM YYYY' \| 'DD/MM/YYYY' \| 'MM/DD/YYYY'` | `'YYYY-MM-DD'` | Display / parse format                          |

### Calendar

| Prop                | Type                                | Default        | Description                              |
| ------------------- | ----------------------------------- | -------------- | ---------------------------------------- |
| `calendar`          | `'umalqura' \| 'civil' \| 'tabular'`| `'umalqura'`   | Islamic calendar variant                 |
| `dayAdjustment`     | `number`                            | `0`            | Shift ±N days for local moon sighting    |
| `locale`            | `'en' \| 'ar'`                      | `'en'`         | Built-in language                        |
| `dir`               | `'ltr' \| 'rtl' \| 'auto'`          | `'auto'`       | Text direction (auto follows locale)     |
| `numerals`          | `'latn' \| 'arab'`                  | `'arab'` for ar| Digit system for display                 |
| `labels`            | `Partial<HijriDatePickerLabels>`    | —              | Override any built-in text               |
| `firstDayOfWeek`    | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`   | `0` (Sunday)   | First weekday column                     |
| `numberedMonths`    | `boolean`                           | `false`        | Prefix month names with their number     |
| `monthsPerRow`      | `1 \| 2 \| 3 \| 4`                  | `2`            | Month-picker grid columns                |
| `optionsStartYear`  | `number`                            | current − 100  | First navigable year (inclusive)         |
| `optionsEndYear`    | `number`                            | current + 20   | Last navigable year (inclusive)          |

### Restrictions

| Prop                | Type                                          | Description                    |
| ------------------- | --------------------------------------------- | ------------------------------ |
| `minDate`/`maxDate` | `string`                                      | Inclusive bounds               |
| `disabledDates`     | `string[]`                                     | Unselectable dates             |
| `shouldDisableDate` | `(hijri: HijriDate, gregorian: Date) => boolean` | Dynamic disabling           |
| `highlightedDates`  | `string[]`                                     | Outlined dates                 |

### Display & behavior

| Prop                      | Type                                     | Default    |
| ------------------------- | ---------------------------------------- | ---------- |
| `inline`                  | `boolean`                                | `false`    |
| `portal`                  | `boolean \| HTMLElement`                 | `false`    |
| `popupPosition`           | `'bottom' \| 'top' \| 'auto'`            | `'auto'`   |
| `showGregorianDates`      | `boolean`                                | `false`    |
| `showGregorianEquivalent` | `boolean`                                | `false`    |
| `showWeekNumbers`         | `boolean`                                | `false`    |
| `showTodayButton`         | `boolean`                                | `true`     |
| `showTodayIndicator`      | `boolean`                                | `true`     |
| `clearable`               | `boolean`                                | `true`     |
| `allowManualInput`        | `boolean` (single mode)                  | `false`    |
| `closeOnSelect`           | `boolean`                                | `true`     |
| `customDayRenderer`       | `(day: number, date: HijriDate) => ReactNode` | —     |
| `onOpen` / `onClose`      | `() => void`                             | —          |
| `onMonthChange`           | `(hy: number, hm: number) => void`       | —          |

### Form & styling

| Prop                                | Type                             | Description                     |
| ----------------------------------- | -------------------------------- | ------------------------------- |
| `name`, `id`                        | `string`                         | Input identifiers               |
| `required`                          | `boolean`                        | Native required validation      |
| `autoFocus`                         | `boolean`                        | Focus on mount                  |
| `error`                             | `boolean`                        | Error visual state              |
| `disabled`, `readOnly`              | `boolean`                        | Input state                     |
| `placeholder`, `aria-label`         | `string`                         | Input text / accessible name    |
| `theme`                             | `'light' \| 'dark' \| 'custom'`  | Built-in theme                  |
| `customColors`                      | `HijriDatePickerColors`          | Per-color overrides             |
| `className`, `containerClassName`, `inputClassName`, `popupClassName` | `string` | Style hooks     |

---

## Utility exports (calendar engine)

The conversion engine is exported for standalone use — all zero-dependency and
built on `Intl`. All `Date` values are **UTC midnight**.

```ts
import {
  gregorianToHijri, hijriToGregorian, todayHijri,
  daysInHijriMonth, isValidHijriDate, addHijriDays,
  compareHijriDates, isSameHijriDate, hijriWeekNumber,
  formatHijriDate, parseHijriDate, formatNumber, normalizeDigits,
  utcDate, addDays, toUtcDay,
} from '@mk01/react-hijri-date-picker'
```

| Function                                                            | Returns              | Description                                         |
| ------------------------------------------------------------------ | -------------------- | --------------------------------------------------- |
| `gregorianToHijri(date, variant?, dayAdjustment?)`                 | `HijriDate`          | Gregorian (UTC midnight) → Hijri                    |
| `hijriToGregorian(date, variant?, dayAdjustment?)`                 | `Date`               | Hijri → Gregorian (UTC midnight)                    |
| `todayHijri(variant?, dayAdjustment?)`                             | `HijriDate`          | Today as a Hijri date                               |
| `daysInHijriMonth(hy, hm, variant?)`                               | `number`             | 29 or 30, per the variant                           |
| `isValidHijriDate(date, variant?)`                                 | `boolean`            | Rejects e.g. day 30 of a 29-day month               |
| `addHijriDays(date, days, variant?)`                               | `HijriDate`          | Add/subtract whole days                             |
| `compareHijriDates(a, b)`                                          | `number`             | `-1 / 0 / 1` ordering                               |
| `isSameHijriDate(a, b)`                                            | `boolean`            | Equality (null-safe)                                |
| `hijriWeekNumber(date, firstDayOfWeek?, variant?)`                 | `number`             | Week of the Hijri year (week 1 has 1 Muharram)      |
| `formatHijriDate(date, format, months, numerals?)`                | `string`             | Format a `HijriDate` with a month-name list         |
| `parseHijriDate(input, format, monthLists)`                       | `HijriDate \| null`  | Parse a string; ISO always accepted, digits normalized |
| `formatNumber(value, numerals?)`                                   | `string`             | Render digits as Latin or Arabic-Indic              |
| `normalizeDigits(text)`                                            | `string`             | Arabic-Indic / Persian digits → ASCII               |
| `utcDate(year, monthIndex, day)`                                   | `Date`               | Build a UTC-midnight `Date` (monthIndex 0–11)       |
| `addDays(date, days)`                                              | `Date`               | Add days to a `Date`                                |
| `toUtcDay(date)`                                                   | `Date`               | UTC midnight of the day carried by `date`           |

```ts
// Examples
gregorianToHijri(new Date(Date.UTC(2025, 2, 30))) // { hy: 1446, hm: 10, hd: 1 } — Eid al-Fitr
daysInHijriMonth(1446, 9)                          // 29 (Ramadan 1446, per Umm al-Qura)
todayHijri()                                       // { hy, hm, hd } for today
```

> `hijriToGregorian` on an invalid date returns the first Gregorian day on or
> after it; call `isValidHijriDate` first when that matters.

---

## Types

All types are exported:

```ts
import type {
  HijriDate,               // { hy: number; hm: number; hd: number }
  CalendarVariant,         // 'umalqura' | 'civil' | 'tabular'
  DateFormat,              // 'YYYY-MM-DD' | 'D MMMM YYYY' | 'DD/MM/YYYY' | 'MM/DD/YYYY'
  NumeralSystem,           // 'latn' | 'arab'
  HijriDatePickerMode,     // 'single' | 'range' | 'multiple'
  HijriRangeValue,         // [string | null, string | null]
  PopupPosition,           // 'bottom' | 'top' | 'auto'
  HijriDatePickerLabels,
  HijriDatePickerColors,
  HijriDatePickerProps,
  HijriDatePickerSingleProps,
  HijriDatePickerRangeProps,
  HijriDatePickerMultipleProps,
  HijriDatePickerHandle,
} from '@mk01/react-hijri-date-picker'
```

`HijriDatePickerProps` is a discriminated union on `mode`, so TypeScript narrows
`value` / `onChange` to the correct shape per mode.

---

## SSR / Next.js

The package ships with `"use client"` and is SSR-safe, so it works in the
Next.js App Router. Import it inside a client component (or a file that already
carries `"use client"`):

```tsx
'use client'
import HijriDatePicker from '@mk01/react-hijri-date-picker'
```

Conversion relies on the JS engine's `Intl` Islamic calendar data, which is
available in Node 14+ and all modern browsers.

---

## Migrating from v1

- **Dates are now accurate.** v1 used a mean-month approximation that drifted
  1–3 days; stored v1 values may map to a neighbouring day in v2.
- **Real month lengths.** Months now have 29 or 30 days (v1 always showed 30).
  Invalid dates like day 30 of a 29-day month are rejected.
- **Header zoom replaces dropdowns.** The month/year `<select>` dropdowns were
  removed; click the header title to zoom day → month → year.
- **`optionsEndYear` is inclusive**, and both `optionsStartYear`/`optionsEndYear`
  default relative to the current year (−100 / +20) instead of 1400–1500.
- **No CSS import.** The `./dist/index.css` export was removed; no import needed.
- **No default `name`.** The input no longer defaults to `name="hijri-date"` —
  pass `name` explicitly.
- **`onChange` (single mode) gains a third argument:** the `HijriDate` object (or
  `null`). Existing two-argument handlers keep working.
- `theme`, `customColors`, and other v1 props otherwise work unchanged.

New in v2: `mode="range"` / `mode="multiple"`, `calendar` variants,
`dayAdjustment`, `numberedMonths`, `monthsPerRow`, `shouldDisableDate`,
`showGregorianDates`, `portal`, `inline`, CSS-variable theming, the imperative
handle, and the exported calendar-engine utilities.

---

## License

MIT
