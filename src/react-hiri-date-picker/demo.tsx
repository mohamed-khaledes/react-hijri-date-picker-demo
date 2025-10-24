import HijriDatePicker from "@mk01/react-hijri-date-picker"
import { useState } from "react"

// Demo Component
function Demo() {
  const [date1, setDate1] = useState('1446-04-15')
  const [date2, setDate2] = useState('')
  const [date3, setDate3] = useState('')

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '28px', fontWeight: 'bold' }}>
        Hijri Date Picker demo
      </h1>
      
      <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Basic Usage</h3>
          <HijriDatePicker
            value={date1}
            onChange={(v) => setDate1(v)}
            placeholder="Select date"
          />
          <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
            Selected: {date1 || 'None'}
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Arabic Locale with Gregorian Display</h3>
          <HijriDatePicker
            value={date2}
            onChange={(v, g) => {
              setDate2(v)
              console.log('Hijri:', v, 'Gregorian:', g)
            }}
            locale="ar"
            format="D MMMM YYYY"
            showGregorianEquivalent
            placeholder="اختر التاريخ"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Dark Theme with Custom Colors</h3>
          <HijriDatePicker
            value={date3}
            onChange={setDate3}
            theme="dark"
            customColors={{
              primary: '#10b981',
              selected: '#059669'
            }}
            highlightedDates={['1446-04-10', '1446-04-20']}
            placeholder="Select date"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>With Restrictions</h3>
          <HijriDatePicker
            onChange={(v) => console.log(v)}
            minDate="1446-04-01"
            maxDate="1446-04-30"
            disabledDates={['1446-04-15', '1446-04-16']}
            placeholder="Only Rabi' al-thani 1446"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Manual Input Enabled</h3>
          <HijriDatePicker
            onChange={(v) => console.log(v)}
            allowManualInput
            format="DD/MM/YYYY"
            placeholder="Type or select: DD/MM/YYYY"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '12px', fontWeight: '600' }}>Disabled State</h3>
          <HijriDatePicker
            value="1446-04-25"
            disabled
            placeholder="Disabled picker"
          />
        </div>
      </div>

    </div>
  )
}

export default Demo