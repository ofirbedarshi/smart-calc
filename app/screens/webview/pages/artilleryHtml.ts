const artilleryHtml = `
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;"><strong id="docs-internal-guid-be9b6568-7fff-9021-7956-99a857dd914e">נתונים</strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl">אש- הסוללה תירה ברגע שהיא מוכנה, ללא צורך באישור נוסף.</p>
<p dir="rtl">לפי פקודה- הסוללה תמתין לפקודת "אש" מסודרת כדי לירות, בינתיים תכין את כל התחמושת הדרושה לירי.</p>
<p dir="rtl">"היכון היכון"- הסוללה תתריע מספר שניות לפני פגיעת הפגז במטרה.</p>
<p dir="rtl">טווחים- 5-29 ק"מ</p>
<p dir="rtl">גודל כוח אש- פלגה (3 קנים), סוללה (6 קנים), גדוד (18 קנים).</p>
<p dir="rtl">קצב אש מקסימלי- 4 פגזים בדקה.</p>
<p dir="rtl">רדיוס פגיעה -50 מטר.</p>
<p dir="rtl">טעות ירי- רדיוס 400 מטר.</p>
<p dir="rtl">פק"לים:</p>
<div dir="rtl" align="left">
<table style="border-collapse: collapse; margin-left: auto; margin-right: auto; width: 100%; border: 1px solid #000000;" border="1"><colgroup><col style="width: 10.7623%;"><col style="width: 35.8744%;"><col style="width: 53.3632%;"></colgroup>
<tbody>
<tr style="text-align: center; background-color: #bfedd2;">
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">שם</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">תחמושת</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">קצב אש</p>
</td>
</tr>
<tr style="text-align: center;">
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">קיפוד</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">8 נפיץ</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">קצב אש מקסימלי</p>
</td>
</tr>
<tr style="text-align: center;">
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">גרזן</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">16 נפיץ</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">קצב אש מקסימלי</p>
</td>
</tr>
<tr style="text-align: center;">
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">וילון</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">6 עשן לכל מוקד (10 דק)</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">2 קצב אש מקסימלי והשאר 1 ל2 דקות</p>
</td>
</tr>
<tr style="text-align: center;">
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">שמש</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">5 תאורה</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">1 לדקה</p>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">טיווח מ"ע<strong id="docs-internal-guid-c7f9b8c0-7fff-5c27-1a7c-f22bd40516da"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">תחילת טיווח - אישור מרמה ממונה</span></p>
<p dir="rtl">(רמ"מ) כאן (הזדהות) מבקש אישור לתחילת טיווח.</p>
<p dir="rtl"><span style="text-decoration: underline;">רישום מטרת טיווח מ.ע- מטרה מדומה</span></p>
<p dir="rtl">(סוללה) כאן ____&nbsp; נשר ציפור מטרת טיווח מ.ע (נ.צ מ.ע)&nbsp; להלן תיקרא מטרה (שם המטרה), עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">פקודה התחילית טיווח</span></p>
<p dir="rtl">(סוללה) כאן_____ על מטרה (שם מטרת מ.ע) ב-1 נפיץ אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">פקודת 2 פגזים נוספים</span></p>
<p dir="rtl">(סוללה) כאן_____ על מטרה (שם מטרת מ.ע), 2 פגזים הפסקה (זמן בין הפגזים 45-60) קטנטנות, אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">נ.צ נפ"מ</span></p>
<p dir="rtl">(סוללה) כאן______ נשר ציפור נפ"מ (נ.צ נפ"מ), עבור.</p>
<p dir="rtl"><strong>*עדכון רמ"מ בסיום טיווח</strong></p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">ירי לתכלית<strong id="docs-internal-guid-06a66974-7fff-409b-645b-4aa54228f8dc"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">רישום מטרה</span></p>
<p dir="rtl">(סוללה) כאן_____ , לרישום מטרה, נשר ציפור (נ.צ מטרה) להלן תיקרא מטרה (שם מטרה), עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">מטרה סדורה</span></p>
<p dir="rtl">(סוללה) כאן______, על מטרה (שם המטרה), ב-(שם הפק"ל: קיפוד/גרזן), אומר שנית (שם הפק"ל) על מטרה (שם המטרה) אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">מטרה מזדמנת</span></p>
<p dir="rtl">(סוללה) כאן______ על מטרה מזדמנת נשר ציפור (נ.צ מטרה) להלן תיקרא (שם מטרה) ב - (שם הפק"ל: קיפוד/גרזן) לפי פקודה/אש עבור.</p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">בניית פק"ל&nbsp;<strong id="docs-internal-guid-9c836b3a-7fff-fc57-d747-a652aa27784f"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl">(סוללה) כאן_____לפקוודתי (מילת הפעלה לפי בחירה) על מטרה (שם המטרה), העסק ב-(סוג וכמות תחמושת), למשך (זמן) קטנות, עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">הפעלת הפק"ל</span></p>
<p dir="rtl">(סוללה) כאן____(מילת הפעלה) על (שם מטרה) אומר שנית (מילת הפעלה) על (שם מטרה), עבור.</p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;"><strong id="docs-internal-guid-c83c15ae-7fff-5c9a-e60f-ffffe4ce486c">תיקונים</strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">פקודת אש רגילה</span></p>
<p dir="rtl">(סוללה) כאן_____, על מטרה (שם המטרה), ב-1 נפיץ, אש , אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון אומדנה</span></p>
<p dir="rtl">(סוללה) כאן_____ על מטרה (שם המטרה), באזימוט ת"מ (אזימוט ת"מ), ימינה/ שמאלה (50-400) קצרים, יותר/ פחות (50/100/200/400) קצרים, ב- 1 נפיץ, לפי פקודה/אש עבור.</p>
<p dir="rtl">נוסחא: אלפית (הפרש אלפיות פגז מטרה) X קו ת"מ (ק"מ) = תיקון במטרים</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון וקטורי</span></p>
<p dir="rtl">(סוללה) כאן אר"ז לפגז &ndash; אזימוט (אזימוט באלפיות) טווח (טווח) קצרים, אר"ז למטרה &ndash; אזימוט (אזימוט באלפיות) טווח (טווח) קצרים, ב-1 נפיץ, לפי פקודה/אש עבור</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון לפי נ.צ</span></p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">עשן ותאורה<strong id="docs-internal-guid-523d3795-7fff-bf75-7821-c16d8cf93923"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">מיסוך</span></p>
<p dir="rtl">(סוללה) כאן____ מטרת סוללה, מטרת מיסוך על (שם מטרה/נ.צ), אזימוט במעלות (אזימוט) אורך מסך (400/600/800/1000) בעשן, למשך (מס דקות) קטנות, לפי פקודה/אש עבור.</p>
<p dir="rtl">*ניתן לתקן מיסוך באומדנה.</p>
<p dir="rtl"><span style="text-decoration: underline;">הארה</span></p>
<p dir="rtl">(סוללה) כאן_____ מטרת סוללה, מטרת הארה על (שם מטרה), בפק"ל שמש ל-(מס דקות) קטנות לפי פקודה/אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון הארה</span></p>
<p dir="rtl">(סוללה) כאן____ על מטרת הארה (שם המטרה) הרם/הורד(מספר בקפיצות של 50) לפי פקודה/אש עבור.</p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">פקודות נוספות<strong id="docs-internal-guid-258d8b04-7fff-3a1f-c269-94a6578a350a"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl">בדוק מוכן - מורה לסוללה לבדוק אם הם מוכנים לפקודת אש.</p>
<p dir="rtl">בדוק ירה- נאמר לאחר שניתנה פקודת אש, מורה לסוללה לבדוק אם היא ירתה כבר.</p>
<p dir="rtl">בדוק נתונים- מורה לסוללה לבצע בדיקה מקיפה של נתוני הירי.</p>
<p dir="rtl">שנה אש- ירי של הפק"ל האחרון שנורה, על אותה מטרה ובאותם נתונים, יש לציין את שם המטרה.</p>
<p dir="rtl">עצור- כאשר תרצו לעצור את הירי מיידית! עקב סיכון של כוחותינו מנפילת הפגזים. הסוללה תעצור את הירי גם של פגזים טעונים, דבר העלול להשבית אותה לדקות הקרובות.</p>
<p dir="rtl">עצור טעינה - הסוללה תירה את הפגזים שהיא כבר טענה, אך לא תטען חדשים. לעצירות שאינן דחופות (תיקונים לתכלית/ השגת אפקט נזק)</p>
</div>
</details>
<p>&nbsp;</p>
`;

export { artilleryHtml };
