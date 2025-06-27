import React, { useState } from 'react';
import Editor from '../editor/Editor';

export default function Playground() {
  const [value, setValue] = useState(`<table border="1" style="border-collapse: collapse; width: 100%; direction: rtl; text-align: right;">
  <thead>
    <tr style="background: #e6f0f5;">
      <th>גורם אש</th>
      <th>חימוש</th>
      <th>כוחתינו</th>
      <th>בלתי מעורבים</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ארטילריה</strong></td>
      <td>נפיץ / תאורה / עשן</td>
      <td>
        טיוח: 1000 מ<br>
        תכלית גלוייה: 350 מ<br>
        תכלית משוריינים: 250 מ
      </td>
      <td></td>
    </tr>
    <tr>
      <td><strong>מרגמות</strong></td>
      <td>נפיץ / תאורה / עשן</td>
      <td>
        טיוח: 1300 מ<br>
        תכלית יום: 300 מ<br>
        תכלית לילה: 450 מ
      </td>
      <td></td>
    </tr>
    <tr>
      <td>תמוז</td>
      <td></td>
      <td>
        נט: 250 יום, 500 לילה<br>
        נא: 500 יום, 1000 לילה
      </td>
      <td>100 מ</td>
    </tr>
    <tr>
      <td>חממ</td>
      <td>גיל, להט, עוקץ, פלדה</td>
      <td>
        כוח גלווי: 300 מ<br>
        כוח משוריין / במבנה: 100 מ
      </td>
      <td></td>
    </tr>
    <tr>
      <td>מס"ק"ר</td>
      <td>
        ישיר: 100 מ טיל<br>
        מדויק, 300 מ תותח<br>
        עקיף: 300 מ
      </td>
      <td>קדרום, פגיון, תמוז, גיל</td>
      <td>
        נט: 5 מ<br>
        רסס: 15 מ
      </td>
    </tr>
    <tr>
      <td>זיק</td>
      <td>מכחולית</td>
      <td>
        כוח נייח: 100 מ<br>
        כוח נייד: 300 מ
      </td>
      <td>
        נט: 5 מ<br>
        רסס: 15 מ
      </td>
    </tr>
    <tr>
      <td>קרב</td>
      <td>כלל סוגי החימושים</td>
      <td>
        שטח בנוי: 250 מ<br>
        שטח פתוח: 500 מ
      </td>
      <td>לפי נצ"א</td>
    </tr>
  </tbody>
</table>`);

  return (
    <div>
      <div style={{ maxWidth: 600, margin: '40px auto' }}>
        {/* Save button */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={() => console.log(value)}>הדפס לקונסול</button>
        </div>
        {/* Editor always visible */}
        <Editor
          content={value}
          onChange={setValue}
        />
        {/* Read-only preview always visible and live */}
        <Editor
          content={value}
          readOnly
        />
      </div>
    </div>
  );
} 