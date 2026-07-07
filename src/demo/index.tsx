import HijriDatePicker, {
  todayHijri,
  addHijriDays,
  daysInHijriMonth,
  gregorianToHijri,
  toUtcDay,
  type HijriDate,
  type HijriRangeValue,
  type HijriDatePickerHandle,
  type CalendarVariant,
} from "@mk01/react-hijri-date-picker";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import "./demo.css";

/* ---------- Tiny inline icon set (no deps) ---------- */
const Icon = {
  Moon: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Sun: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Github: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  ),
  Copy: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Book: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  Grid: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Compass: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Sliders: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
    </svg>
  ),
  Globe: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Languages: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h10M9 4v4M7 8s0 4-4 8M11 12s-1.5 3-6 5M13 20l4-9 4 9M14.5 17h5" />
    </svg>
  ),
  CalendarDays: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  Lock: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  CalendarX: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M10 14l4 4M14 14l-4 4" />
    </svg>
  ),
  Type: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  External: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </svg>
  ),
  Palette: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r="1.5" />
      <circle cx="17.5" cy="10.5" r="1.5" />
      <circle cx="8.5" cy="7.5" r="1.5" />
      <circle cx="6.5" cy="12.5" r="1.5" />
      <path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.6-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A4.7 4.7 0 0 0 22 10.5C22 5.8 17.5 2 12 2z" />
    </svg>
  ),
  Code: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  Terminal: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 17 6-6-6-6M12 19h8" />
    </svg>
  ),
  Form: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h3" />
    </svg>
  ),
  Keyboard: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </svg>
  ),
  Slash: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M4.9 4.9l14.2 14.2" />
    </svg>
  ),
};

type Theme = "light" | "dark";

/* ---------- Date helpers (derive everything from today so the demo never goes stale) ---------- */
const pad = (n: number) => String(n).padStart(2, "0");
const isoH = (d: HijriDate) => `${d.hy}-${pad(d.hm)}-${pad(d.hd)}`;

const HIJRI_MONTHS_EN = [
  "Muharram",
  "Safar",
  "Rabiʿ I",
  "Rabiʿ II",
  "Jumada I",
  "Jumada II",
  "Rajab",
  "Shaʿban",
  "Ramadan",
  "Shawwal",
  "Dhuʿl-Qaʿda",
  "Dhuʿl-Hijja",
];

const TODAY = todayHijri();
const MONTH_NAME = HIJRI_MONTHS_EN[TODAY.hm - 1];
const MONTH_START: HijriDate = { hy: TODAY.hy, hm: TODAY.hm, hd: 1 };
const MONTH_END: HijriDate = {
  hy: TODAY.hy,
  hm: TODAY.hm,
  hd: daysInHijriMonth(TODAY.hy, TODAY.hm),
};
const GREG_TODAY = toUtcDay(new Date());

const CALENDARS: { label: string; value: CalendarVariant }[] = [
  { label: "Umm al-Qura", value: "umalqura" },
  { label: "Civil", value: "civil" },
  { label: "Tabular", value: "tabular" },
];

/* Turkish labels for the custom-localization example */
const TR_LABELS = {
  months: [
    "Muharrem",
    "Safer",
    "Rebiülevvel",
    "Rebiülahir",
    "Cemaziyelevvel",
    "Cemaziyelahir",
    "Recep",
    "Şaban",
    "Ramazan",
    "Şevval",
    "Zilkade",
    "Zilhicce",
  ],
  weekdays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  today: "Bugün",
  clear: "Temizle",
};

/* ---------- Copy-paste snippets (self-contained, runnable in a user's project) ---------- */
const SNIPPETS = {
  single: `import HijriDatePicker from '@mk01/react-hijri-date-picker'
import { useState } from 'react'

export default function Example() {
  const [date, setDate] = useState('1447-01-21')
  return (
    <HijriDatePicker
      value={date}
      onChange={(value, gregorian, hijri) => setDate(value)}
      numberedMonths          // "1- Muharram" in header + month grid
      monthsPerRow={3}        // month-picker grid columns (1–4)
      placeholder="Select date"
    />
  )
}`,

  range: `import HijriDatePicker, { type HijriRangeValue } from '@mk01/react-hijri-date-picker'
import { useState } from 'react'

export default function Example() {
  const [range, setRange] = useState<HijriRangeValue>(['1447-01-21', '1447-01-27'])
  return (
    <HijriDatePicker
      mode="range"
      value={range}
      onChange={(value) => setRange(value)}
      placeholder="Select a range"
    />
  )
}`,

  multiple: `import HijriDatePicker from '@mk01/react-hijri-date-picker'
import { useState } from 'react'

export default function Example() {
  const [dates, setDates] = useState<string[]>(['1447-01-21', '1447-01-23'])
  return (
    <HijriDatePicker
      mode="multiple"
      value={dates}
      onChange={(value) => setDates(value)}
      placeholder="Select multiple"
    />
  )
}`,

  variants: `import HijriDatePicker, { type CalendarVariant } from '@mk01/react-hijri-date-picker'
import { useState } from 'react'

export default function Example() {
  const [calendar, setCalendar] = useState<CalendarVariant>('umalqura')
  // 'umalqura' (default) | 'civil' | 'tabular'
  return <HijriDatePicker calendar={calendar} onChange={(v) => console.log(v)} />
}`,

  dayAdjustment: `import HijriDatePicker from '@mk01/react-hijri-date-picker'
import { useState } from 'react'

export default function Example() {
  const [offset, setOffset] = useState(0)
  return (
    <>
      <input
        type="range" min={-2} max={2} value={offset}
        onChange={(e) => setOffset(Number(e.target.value))}
      />
      {/* shift ±N days for a local moon sighting */}
      <HijriDatePicker dayAdjustment={offset} />
    </>
  )
}`,

  dualCells: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <HijriDatePicker
      showGregorianDates       // Gregorian day number inside each cell
      showGregorianEquivalent  // Gregorian date in the footer
      placeholder="Open to see both dates"
    />
  )
}`,

  arabic: `import HijriDatePicker from '@mk01/react-hijri-date-picker'
import { useState } from 'react'

export default function Example() {
  const [date, setDate] = useState('')
  return (
    <HijriDatePicker
      value={date}
      onChange={(value, gregorian) => setDate(value)}
      locale="ar"                 // RTL + Arabic-Indic digits automatically
      format="D MMMM YYYY"
      showGregorianEquivalent
      placeholder="اختر التاريخ"
    />
  )
}`,

  numerals: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <>
      {/* Arabic-Indic digits (١٤٤٧) + RTL by default */}
      <HijriDatePicker locale="ar" defaultValue="1447-01-21" />

      {/* Force Latin digits */}
      <HijriDatePicker locale="ar" numerals="latn" defaultValue="1447-01-21" />
    </>
  )
}`,

  turkish: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

const tr = {
  months: ['Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir', 'Cemaziyelevvel',
    'Cemaziyelahir', 'Recep', 'Şaban', 'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'],
  weekdays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Bugün', clear: 'Temizle',
}

export default function Example() {
  return <HijriDatePicker labels={tr} format="D MMMM YYYY" placeholder="Bir tarih seçin" />
}`,

  restrictions: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <HijriDatePicker
      minDate="1447-01-01"
      maxDate="1447-01-30"
      disabledDates={['1447-01-22', '1447-01-23']}
      highlightedDates={['1447-01-25']}
      onChange={(value) => console.log(value)}
    />
  )
}`,

  dynamicDisable: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <HijriDatePicker
      // disable every Friday (Gregorian getUTCDay() === 5)
      shouldDisableDate={(hijri, gregorian) => gregorian.getUTCDay() === 5}
      onChange={(value) => console.log(value)}
    />
  )
}`,

  manualInput: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <HijriDatePicker
      allowManualInput          // type a date directly (accepts Arabic-Indic digits)
      format="DD/MM/YYYY"
      onChange={(value) => console.log(value)}
      placeholder="Type or select: DD/MM/YYYY"
    />
  )
}`,

  customColors: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <HijriDatePicker
      theme="custom"
      customColors={{ primary: '#10b981', selected: '#059669' }}
      highlightedDates={['1447-01-26']}
      defaultValue="1447-01-21"
    />
  )
}`,

  cssVars: `import HijriDatePicker from '@mk01/react-hijri-date-picker'
import './theme.css'

// theme.css:
//   .violet {
//     --hijri-dp-primary: #7c3aed;
//     --hijri-dp-selected: #6d28d9;
//   }
export default function Example() {
  return (
    <div className="violet">
      <HijriDatePicker defaultValue="1447-01-21" />
    </div>
  )
}`,

  portal: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* portal renders the popup into document.body, escaping overflow:hidden */}
      <HijriDatePicker portal placeholder="I escape the box" />
    </div>
  )
}`,

  inline: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return (
    <>
      {/* always-visible calendar, no text input */}
      <HijriDatePicker inline showTodayButton defaultValue="1447-01-21" />
      <HijriDatePicker inline locale="ar" defaultValue="1447-01-21" />
    </>
  )
}`,

  imperative: `import HijriDatePicker, { type HijriDatePickerHandle } from '@mk01/react-hijri-date-picker'
import { useRef } from 'react'

export default function Example() {
  const ref = useRef<HijriDatePickerHandle>(null)
  return (
    <>
      <HijriDatePicker ref={ref} defaultValue="1447-01-21" />
      <button onClick={() => ref.current?.open()}>open()</button>
      <button onClick={() => ref.current?.close()}>close()</button>
      <button onClick={() => ref.current?.clear()}>clear()</button>
    </>
  )
}`,

  form: `import HijriDatePicker from '@mk01/react-hijri-date-picker'
import { useState, type FormEvent } from 'react'

export default function Example() {
  const [error, setError] = useState(false)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = new FormData(e.currentTarget).get('appointment')
    setError(!value)
  }
  return (
    <form onSubmit={onSubmit}>
      <HijriDatePicker name="appointment" required error={error} />
      <button type="submit">Submit</button>
    </form>
  )
}`,

  disabled: `import HijriDatePicker from '@mk01/react-hijri-date-picker'

export default function Example() {
  return <HijriDatePicker value="1447-01-24" disabled placeholder="Disabled picker" />
}`,
};

/* ---------- Presentational helpers ---------- */
function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="demo__code">
      <button
        type="button"
        className={"demo__code-copy" + (copied ? " demo__code-copy--done" : "")}
        onClick={copy}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
      {/* Keep code LTR even inside RTL (Arabic) cards. */}
      <pre dir="ltr">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Card({
  icon,
  title,
  desc,
  children,
  result,
  wide,
  code,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  children: ReactNode;
  result?: ReactNode;
  wide?: boolean;
  code?: string;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const showCode = Boolean(code) && tab === "code";
  return (
    <div className={"demo__card" + (wide ? " demo__card--wide" : "")}>
      <div className="demo__card-head">
        <div className="demo__card-icon">{icon}</div>
        <div>
          <h3 className="demo__card-title">{title}</h3>
          <p className="demo__card-desc">{desc}</p>
        </div>
      </div>

      {code && (
        <div className="demo__tabs" role="tablist" aria-label={`${title} view`}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            className={
              "demo__tab" + (tab === "preview" ? " demo__tab--active" : "")
            }
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "code"}
            className={
              "demo__tab" + (tab === "code" ? " demo__tab--active" : "")
            }
            onClick={() => setTab("code")}
          >
            Code
          </button>
        </div>
      )}

      <div className="demo__card-body">
        {/* Preview stays mounted (display toggle) so live pickers keep state. */}
        <div style={{ display: showCode ? "none" : "block" }}>
          {children}
          {result}
        </div>
        {showCode && <CodeBlock code={code!} />}
      </div>
    </div>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  const empty = !value;
  return (
    <div className="demo__result">
      {label}
      <span
        className={
          "demo__result-value" + (empty ? " demo__result-value--empty" : "")
        }
      >
        {value || "none"}
      </span>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="demo__section-head">
      <span className="demo__section-eyebrow">{eyebrow}</span>
      <h2 className="demo__section-title">{title}</h2>
      <p className="demo__section-sub">{sub}</p>
    </div>
  );
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="demo__seg" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={o.value === value}
          className={
            "demo__seg-btn" +
            (o.value === value ? " demo__seg-btn--active" : "")
          }
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Demo() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("hdp-theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [toast, setToast] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hdp-theme", theme);
  }, [theme]);

  const pickerTheme = theme === "dark" ? "dark" : "light";

  /* ---- Selection state ---- */
  const [single, setSingle] = useState(isoH(TODAY));
  const [range, setRange] = useState<HijriRangeValue>([
    isoH(TODAY),
    isoH(addHijriDays(TODAY, 6)),
  ]);
  const [multi, setMulti] = useState<string[]>([
    isoH(TODAY),
    isoH(addHijriDays(TODAY, 2)),
    isoH(addHijriDays(TODAY, 5)),
  ]);
  const [arabic, setArabic] = useState("");

  /* ---- Engine explorers ---- */
  const [variant, setVariant] = useState<CalendarVariant>("umalqura");
  const [adjustment, setAdjustment] = useState(0);

  /* ---- Imperative handle ---- */
  const pickerRef = useRef<HijriDatePickerHandle>(null);

  /* ---- Form ---- */
  const [formMsg, setFormMsg] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [formError, setFormError] = useState(false);

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(
        "npm i @mk01/react-hijri-date-picker",
      );
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("appointment");
    if (!value) {
      setFormError(true);
      setFormMsg({ ok: false, text: "A date is required before submitting." });
      return;
    }
    setFormError(false);
    setFormMsg({ ok: true, text: `Submitted appointment: ${value}` });
  };

  return (
    <div className="demo">
      {/* Top bar */}
      <header className="demo__topbar">
        <div className="demo__brand">
          <span className="demo__logo">
            <Icon.Calendar />
          </span>
          react-hijri-date-picker
        </div>
        <div className="demo__topbar-actions">
          <a
            className="demo__docs-link"
            href="https://github.com/mohamed-khaledes/react-hijri-date-picker-demo/blob/main/DOCS.md"
            target="_blank"
            rel="noreferrer"
          >
            <Icon.Book />
            <span>Docs</span>
          </a>
          <a
            className="demo__iconbtn"
            href="https://github.com/mohamed-khaledes/react-hijri-date-picker-demo"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
          >
            <Icon.Github />
          </a>
          <button
            className="demo__iconbtn"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle color theme"
          >
            {theme === "light" ? <Icon.Moon /> : <Icon.Sun />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="demo__hero">
        <span className="demo__badge">
          <span className="demo__badge-dot" />
          v2.0 · Umm al-Qura accurate · zero dependencies
        </span>
        <h1 className="demo__title">
          Pick Hijri dates,
          <br />
          <span className="demo__title-grad">accurately.</span>
        </h1>
        <p className="demo__subtitle">
          An accessible Hijri (Islamic) date picker for React. Real Umm al-Qura
          conversion via built-in <code>Intl</code> — single, range &amp;
          multiple selection, RTL, theming, and full keyboard support.
        </p>
        <div className="demo__cta">
          <button className="demo__install" onClick={copyInstall}>
            <span className="demo__install-prompt">$</span>
            npm i @mk01/react-hijri-date-picker
            <span className="demo__install-copy">
              <Icon.Copy />
            </span>
          </button>
          <a
            className="demo__link-btn"
            href="https://github.com/mohamed-khaledes/react-hijri-date-picker-demo"
            target="_blank"
            rel="noreferrer"
          >
            <Icon.Github /> GitHub
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="demo__stats">
        <div>
          <div className="demo__stat-value">3</div>
          <div className="demo__stat-label">Selection modes</div>
        </div>
        <div>
          <div className="demo__stat-value">3</div>
          <div className="demo__stat-label">Calendar systems</div>
        </div>
        <div>
          <div className="demo__stat-value">0</div>
          <div className="demo__stat-label">Dependencies</div>
        </div>
        <div>
          <div className="demo__stat-value">100%</div>
          <div className="demo__stat-label">TypeScript</div>
        </div>
      </section>

      {/* ============ Selection modes ============ */}
      <section className="demo__section">
        <SectionHead
          eyebrow="Selection"
          title="Three selection modes"
          sub="The same component covers single dates, ranges, and arbitrary multi-date picking — the value and onChange shapes follow the mode."
        />
        <div className="demo__grid">
          <Card
            icon={<Icon.Book />}
            title="Single (default)"
            desc="Controlled value with a simple onChange handler. Numbered months, 3 per row in the month grid."
            code={SNIPPETS.single}
            result={<Result label="Selected:" value={single} />}
          >
            <HijriDatePicker
              value={single}
              onChange={(v, g, h) => {
                setSingle(v);
                console.log("single →", v, g, h);
              }}
              theme={pickerTheme}
              placeholder="Select date"
              numberedMonths
              monthsPerRow={3}
            />
          </Card>

          <Card
            icon={<Icon.Layers />}
            title="Range"
            desc={'mode="range" — pick a start and end day.'}
            code={SNIPPETS.range}
            result={
              <Result
                label="Range:"
                value={
                  range[0] || range[1]
                    ? `${range[0] ?? "…"}  →  ${range[1] ?? "…"}`
                    : ""
                }
              />
            }
          >
            <HijriDatePicker
              mode="range"
              value={range}
              onChange={(v) => setRange(v)}
              theme={pickerTheme}
              placeholder="Select a range"
            />
          </Card>

          <Card
            icon={<Icon.Grid />}
            title="Multiple"
            desc={'mode="multiple" — toggle any number of days.'}
            code={SNIPPETS.multiple}
            result={
              <Result
                label="Picked:"
                value={multi.length ? `${multi.length} dates` : ""}
              />
            }
          >
            <HijriDatePicker
              mode="multiple"
              value={multi}
              onChange={(v) => setMulti(v)}
              theme={pickerTheme}
              placeholder="Select multiple"
            />
          </Card>
        </div>
      </section>

      {/* ============ Accurate calendar engine ============ */}
      <section className="demo__section">
        <SectionHead
          eyebrow="Engine"
          title="An accurate calendar engine"
          sub="Conversion runs on the JS engine's built-in Intl Islamic calendars, so month lengths (29/30 days) and Gregorian mappings are real — with variants and a moon-sighting offset."
        />
        <div className="demo__grid">
          <Card
            icon={<Icon.Compass />}
            title="Calendar variants"
            desc="The same Gregorian day maps to different Hijri dates across the three Islamic calendar systems."
            code={SNIPPETS.variants}
          >
            <Segmented
              options={CALENDARS}
              value={variant}
              onChange={setVariant}
            />
            <HijriDatePicker
              calendar={variant}
              theme={pickerTheme}
              placeholder={`Pick a date (${variant})`}
            />
            <div className="demo__compare">
              {CALENDARS.map((c) => (
                <div className="demo__compare-row" key={c.value}>
                  <span className="demo__compare-key">{c.label}</span>
                  <span className="demo__compare-val">
                    {isoH(gregorianToHijri(GREG_TODAY, c.value))}
                  </span>
                </div>
              ))}
            </div>
            <p className="demo__clip-note">Today, converted in each system.</p>
          </Card>

          <Card
            icon={<Icon.Sliders />}
            title="Day adjustment"
            desc="Shift the calendar ±N days to match a local moon sighting that differs from the tables."
            code={SNIPPETS.dayAdjustment}
          >
            <input
              className="demo__slider"
              type="range"
              min={-2}
              max={2}
              step={1}
              value={adjustment}
              onChange={(e) => setAdjustment(Number(e.target.value))}
              aria-label="Day adjustment"
            />
            <div className="demo__slider-labels">
              <span>−2</span>
              <span>−1</span>
              <span>0</span>
              <span>+1</span>
              <span>+2</span>
            </div>
            <HijriDatePicker
              dayAdjustment={adjustment}
              theme={pickerTheme}
              placeholder="Adjusted calendar"
            />
            <div className="demo__result">
              dayAdjustment&nbsp;
              <span className="demo__adj-badge">
                {adjustment > 0 ? `+${adjustment}` : adjustment}
              </span>
              &nbsp;→ today is&nbsp;
              <span className="demo__result-value">
                {isoH(gregorianToHijri(GREG_TODAY, "umalqura", adjustment))}
              </span>
            </div>
          </Card>

          <Card
            icon={<Icon.CalendarDays />}
            title="Dual calendar cells"
            desc="showGregorianDates prints the Gregorian day number inside every cell — open the calendar to see both."
            code={SNIPPETS.dualCells}
          >
            <HijriDatePicker
              showGregorianDates
              showGregorianEquivalent
              theme={pickerTheme}
              placeholder="Open to see both dates"
            />
          </Card>

          <Card
            icon={<Icon.Globe />}
            title="Arabic locale + Gregorian"
            desc="Right-to-left Arabic UI showing the Gregorian equivalent in the footer."
            code={SNIPPETS.arabic}
            result={<Result label="Selected:" value={arabic} />}
          >
            <HijriDatePicker
              value={arabic}
              onChange={(v, g) => {
                setArabic(v);
                console.log("Hijri:", v, "Gregorian:", g);
              }}
              locale="ar"
              format="D MMMM YYYY"
              theme={pickerTheme}
              showGregorianEquivalent
              placeholder="اختر التاريخ"
            />
          </Card>
        </div>
      </section>

      {/* ============ Localization ============ */}
      <section className="demo__section">
        <SectionHead
          eyebrow="Localization"
          title="Speaks your language"
          sub="Arabic locale flips to RTL and Arabic-Indic numerals automatically, and every string is overridable via the labels prop."
        />
        <div className="demo__grid">
          <Card
            icon={<Icon.Languages />}
            title="Arabic-Indic numerals & RTL"
            desc={
              'locale="ar" renders ١٤٤٦-style digits and RTL by default — or force Latin digits with numerals="latn".'
            }
            code={SNIPPETS.numerals}
          >
            <div className="demo__stack">
              <div>
                <div className="demo__mini-label">
                  locale="ar" (default digits)
                </div>
                <HijriDatePicker
                  locale="ar"
                  defaultValue={isoH(TODAY)}
                  theme={pickerTheme}
                  placeholder="اختر التاريخ"
                />
              </div>
              <div>
                <div className="demo__mini-label">
                  locale="ar" + numerals="latn"
                </div>
                <HijriDatePicker
                  locale="ar"
                  numerals="latn"
                  defaultValue={isoH(TODAY)}
                  theme={pickerTheme}
                  placeholder="اختر التاريخ"
                />
              </div>
            </div>
          </Card>

          <Card
            icon={<Icon.Globe />}
            title="Custom localization (Turkish)"
            desc="Provide your own month names, weekdays, and button labels through the labels prop — here in Turkish."
            code={SNIPPETS.turkish}
          >
            <HijriDatePicker
              labels={TR_LABELS}
              format="D MMMM YYYY"
              theme={pickerTheme}
              placeholder="Bir tarih seçin"
            />
          </Card>
        </div>
      </section>

      {/* ============ Restrictions ============ */}
      <section className="demo__section">
        <SectionHead
          eyebrow="Validation"
          title="Restrictions & validation"
          sub={`Bound to real month lengths — ${MONTH_NAME} ${TODAY.hy} shows exactly ${MONTH_END.hd} days. Constrain with min/max, static lists, or a dynamic callback.`}
        />
        <div className="demo__grid">
          <Card
            icon={<Icon.Lock />}
            title="Range restrictions"
            desc={`Locked to ${MONTH_NAME} ${TODAY.hy}, with two days disabled.`}
            code={SNIPPETS.restrictions}
          >
            <HijriDatePicker
              onChange={(v) => console.log(v)}
              theme={pickerTheme}
              minDate={isoH(MONTH_START)}
              maxDate={isoH(MONTH_END)}
              disabledDates={[
                isoH(addHijriDays(TODAY, 1)),
                isoH(addHijriDays(TODAY, 2)),
              ]}
              highlightedDates={[isoH(addHijriDays(TODAY, 4))]}
              placeholder={`${MONTH_NAME} ${TODAY.hy} only`}
            />
          </Card>

          <Card
            icon={<Icon.CalendarX />}
            title="Dynamic disabling"
            desc="shouldDisableDate runs per cell — here it greys out every Friday using the Gregorian equivalent."
            code={SNIPPETS.dynamicDisable}
          >
            <HijriDatePicker
              onChange={(v) => console.log(v)}
              theme={pickerTheme}
              shouldDisableDate={(_h, g) => g.getUTCDay() === 5}
              placeholder="Fridays are disabled"
            />
          </Card>

          <Card
            icon={<Icon.Type />}
            title="Manual input"
            desc="Let users type a date directly; parsing is format-aware and accepts Arabic-Indic digits."
            code={SNIPPETS.manualInput}
          >
            <HijriDatePicker
              onChange={(v) => console.log(v)}
              theme={pickerTheme}
              allowManualInput
              format="DD/MM/YYYY"
              placeholder="Type or select: DD/MM/YYYY"
            />
          </Card>
        </div>
      </section>

      {/* ============ Display & rendering ============ */}
      <section className="demo__section">
        <SectionHead
          eyebrow="Rendering"
          title="Display & rendering"
          sub="Render inline, portal the popup out of clipped containers, and theme with props or plain CSS variables."
        />
        <div className="demo__grid">
          <Card
            icon={<Icon.Palette />}
            title="Custom colors (props)"
            desc="Override the accent palette with the customColors prop."
            code={SNIPPETS.customColors}
          >
            <HijriDatePicker
              theme="custom"
              customColors={{ primary: "#10b981", selected: "#059669" }}
              highlightedDates={[isoH(addHijriDays(TODAY, 5))]}
              defaultValue={isoH(TODAY)}
              placeholder="Select date"
            />
          </Card>

          <Card
            icon={<Icon.Code />}
            title="CSS-variable theming"
            desc="No props needed — set --hijri-dp-* variables on any ancestor. This one is themed violet."
            code={SNIPPETS.cssVars}
          >
            <div className="hijri-theme-violet">
              <HijriDatePicker
                theme={pickerTheme}
                defaultValue={isoH(TODAY)}
                placeholder="Violet via CSS vars"
              />
            </div>
            <div className="demo__code-hint">
              <span className="tok">--hijri-dp-primary</span>: #7c3aed;
              <br />
              <span className="tok">--hijri-dp-selected</span>: #6d28d9;
            </div>
          </Card>

          <Card
            icon={<Icon.External />}
            title="Portal popup"
            desc="portal renders the popup into document.body so it escapes overflow:hidden ancestors like this clipped box."
            code={SNIPPETS.portal}
          >
            <div className="demo__clip">
              <HijriDatePicker
                portal
                theme={pickerTheme}
                placeholder="Open me — I escape the box"
              />
            </div>
            <p className="demo__clip-note">
              The container clips its content, yet the popup still shows in
              full.
            </p>
          </Card>

          <Card
            icon={<Icon.Calendar />}
            title="Inline calendar"
            desc="inline renders the calendar permanently, with no text input — ideal for dashboards and sidebars. Here in English (LTR) and Arabic (RTL) side by side."
            code={SNIPPETS.inline}
            wide
          >
            <div className="demo__inline-pair">
              <figure>
                <HijriDatePicker
                  inline
                  showTodayButton
                  defaultValue={isoH(TODAY)}
                  theme={pickerTheme}
                  onChange={(v) => console.log("inline en →", v)}
                />
                <figcaption>English · LTR</figcaption>
              </figure>
              <figure>
                <HijriDatePicker
                  inline
                  showTodayButton
                  locale="ar"
                  defaultValue={isoH(TODAY)}
                  theme={pickerTheme}
                  onChange={(v) => console.log("inline ar →", v)}
                />
                <figcaption>العربية · RTL</figcaption>
              </figure>
            </div>
          </Card>
        </div>
      </section>

      {/* ============ Integration & a11y ============ */}
      <section className="demo__section">
        <SectionHead
          eyebrow="Integration"
          title="Forms, refs & accessibility"
          sub="Drive it imperatively through a ref, drop it straight into a form, and rely on full keyboard and screen-reader support."
        />
        <div className="demo__grid">
          <Card
            icon={<Icon.Terminal />}
            title="Imperative handle"
            desc="Call open(), close(), and clear() through a HijriDatePickerHandle ref."
            code={SNIPPETS.imperative}
          >
            <HijriDatePicker
              ref={pickerRef}
              defaultValue={isoH(TODAY)}
              theme={pickerTheme}
              placeholder="Controlled by buttons"
            />
            <div className="demo__btnrow">
              <button
                className="demo__btn demo__btn--primary"
                onClick={() => pickerRef.current?.open()}
              >
                open()
              </button>
              <button
                className="demo__btn"
                onClick={() => pickerRef.current?.close()}
              >
                close()
              </button>
              <button
                className="demo__btn"
                onClick={() => pickerRef.current?.clear()}
              >
                clear()
              </button>
            </div>
          </Card>

          <Card
            icon={<Icon.Form />}
            title="Form integration"
            desc="Works with native forms via name / required, and shows an error state until a value is provided."
            code={SNIPPETS.form}
          >
            <form className="demo__form" onSubmit={handleSubmit}>
              <HijriDatePicker
                name="appointment"
                required
                error={formError}
                theme={pickerTheme}
                placeholder="Pick an appointment"
              />
              <button className="demo__btn demo__btn--primary" type="submit">
                Submit
              </button>
              {formMsg && (
                <p
                  className={
                    "demo__form-msg " +
                    (formMsg.ok ? "demo__form-msg--ok" : "demo__form-msg--err")
                  }
                >
                  {formMsg.text}
                </p>
              )}
            </form>
          </Card>

          <Card
            icon={<Icon.Slash />}
            title="Disabled state"
            desc="A read-only, non-interactive picker with a preset value."
            code={SNIPPETS.disabled}
          >
            <HijriDatePicker
              value={isoH(addHijriDays(TODAY, 3))}
              theme={pickerTheme}
              disabled
              placeholder="Disabled picker"
            />
          </Card>

          <Card
            icon={<Icon.Keyboard />}
            title="Keyboard accessibility"
            desc="The calendar is a fully keyboard-operable dialog + grid with roving focus and live month announcements."
            wide
          >
            <div className="demo__keys">
              <div className="demo__key-row">
                <kbd className="demo__kbd">Enter</kbd>
                <kbd className="demo__kbd">Space</kbd>
                <kbd className="demo__kbd">↓</kbd>
                <span>Open the calendar</span>
              </div>
              <div className="demo__key-row">
                <kbd className="demo__kbd">← ↑ → ↓</kbd>
                <span>Move focus by day / week</span>
              </div>
              <div className="demo__key-row">
                <kbd className="demo__kbd">Home</kbd>
                <kbd className="demo__kbd">End</kbd>
                <span>Start / end of week</span>
              </div>
              <div className="demo__key-row">
                <kbd className="demo__kbd">PageUp</kbd>
                <kbd className="demo__kbd">PageDown</kbd>
                <span>Previous / next month</span>
              </div>
              <div className="demo__key-row">
                <kbd className="demo__kbd">Shift</kbd>
                <span>+ PageUp/Down → change year</span>
              </div>
              <div className="demo__key-row">
                <kbd className="demo__kbd">Enter</kbd>
                <kbd className="demo__kbd">Space</kbd>
                <span>Select the focused day</span>
              </div>
              <div className="demo__key-row">
                <kbd className="demo__kbd">Esc</kbd>
                <span>Close &amp; return focus to input</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="demo__footer">
        Built with{" "}
        <a
          href="https://www.npmjs.com/package/@mk01/react-hijri-date-picker"
          target="_blank"
          rel="noreferrer"
        >
          @mk01/react-hijri-date-picker
        </a>{" "}
        · MIT Licensed
      </footer>

      <div className={"demo__toast" + (toast ? " demo__toast--show" : "")}>
        Copied to clipboard ✓
      </div>
    </div>
  );
}

export default Demo;
