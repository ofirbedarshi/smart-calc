const mortarsHtml = `
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;"><strong id="docs-internal-guid-e1753a77-7fff-d418-8312-f968d7687c16">נתונים</strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl">מטרה סדורה- מטרה אשר תוכננה בנוהל קרב או נרשמה בעבר.</p>
<p dir="rtl">מטרה מזדמנת- מטרה אשר רושמים באותו רגע שמפעילים.</p>
<p dir="rtl">טווח מקסימלי- 7 ק"מ</p>
<p dir="rtl">טווח מינימלי- 450 מטר</p>
<p dir="rtl">גודל כוח אש- קנה(1), כיתה (2), פלגה (3), מחלקה (4)</p>
<p dir="rtl">קצב אש מקסימלי- 9-12 פצצות לדקה למקסימום מקסימום 2 דקות.</p>
<p dir="rtl">רדיוס פגיעה -50X75</p>
<p dir="rtl">טעות ירי- מעל 400 זה טעות ירי, ותיקון מצטבר מעל 550</p>
<p dir="rtl">פק"לים:</p>
<div dir="rtl" align="left">
<table style="border-collapse: collapse; border: 1px solid #000000;" border="1"><colgroup><col><col><col></colgroup>
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
<p dir="rtl">הוליווד</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">2 פצמ״ר נפיץ למשך x דקות</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">לפי הגדרה</p>
</td>
</tr>
<tr style="text-align: center;">
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">ציריך</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">5 פצמ״ר נפיץ מכל קנה</p>
</td>
<td dir="ltr" style="border-color: #000000;">
<p dir="rtl">קצב אש מקסימלי</p>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">טיווח קנים<strong id="docs-internal-guid-a6afe728-7fff-af51-7f4b-0b8d347a68f0"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">רישום מטרה</span></p>
<p dir="rtl">7/תאו כאן____ לרישום מטרה, נשר ציפור(נ.צ מטרה), להלן תיקרא (שם המטרה), עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">כדור ביקורת לקנה בכיר</span></p>
<p dir="rtl">7/תאו כאן _____ מטרת (קנה/ כיתה/ פלגה/ מחלקה) מטרה (סדורה/מזדמנת), (שם המטרה), ב-1 נפיץ, לפי</p>
<p dir="rtl">פקודה/אש עבור.</p>
<p dir="rtl">*ירי 1 נפיץ למטרה של הקנה הבכיר ותיקון במידת הצורך, ולאחר ירי ביקורת של שאר הקנים היורים למטרה (תלוי בגודל המטרה)</p>
<p dir="rtl"><span style="text-decoration: underline;">כדור ביקורת שאר הקנים</span></p>
<p dir="rtl">7/תאו כאן____ קבל פגיעה על מטרה (שם המטרה) צא לפצצת ביקורת במטח בנפיץ לפי פקודה/אש עבור.</p>
<p dir="rtl">במידה ופצצה סטתה נרצה לזהות מי הקנה שירה אותה, ולכן נבצע שלב אש מבוקרת: ירי של כל קנה מימין לשמאל עם הפסקה בין הפצצות, בכל הפסקה נבחין מי הפצצה שסטתה ונתקן רק אותה.</p>
<p dir="rtl"><span style="text-decoration: underline;">פקודת חגורת אש</span></p>
<p dir="rtl">7/תאו כאן___ פגיעה על יעד (שם המטרה), חגורת אש, הפסקה 20 שניות, בנפיץ, לפי פקודה/אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">פקודה תיקון חגורת אש</span></p>
<p dir="rtl">7/תאו כאן____ קבל תיקון על מטרת_____ באזימוט תמ (אזימוט תמ)&nbsp;</p>
<p dir="rtl">קנה 1 (ימינה/שמאלה/יותר/פחות)</p>
<p dir="rtl">קנה 2 (ימינה/שמאלה/יותר/פחות)</p>
<p dir="rtl">קנה 3 (ימינה/שמאלה/יותר/פחות)</p>
<p dir="rtl">בנפיץ לפי פקודה/אש עבור.</p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">ירי לתכלית<strong id="docs-internal-guid-a4d719ff-7fff-9757-204c-436cc821be3d"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">מטרה סדורה:</span></p>
<p dir="rtl">7/תאו כאן_____ מטרת (קנה/ כיתה/ פלגה /מחלקה) על מטרה (שם המטרה) ב-(הוליווד/ציריך) אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">מטרה מזדמנת</span></p>
<p dir="rtl">7/תאו כאן_____מטרת (קנה/ כיתה/ פלגה /מחלקה) על מטרה מזדמנת, נשר ציפור (נ.צ מטרה), להלן תיקרא (שם מטרה) ב- (הולויווד/ ציריך) אש עבור.</p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;">עשן ותאורה<strong id="docs-internal-guid-8b941226-7fff-f06a-cfd7-eca6e197afa5"></strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">מיסוך</span></p>
<p dir="rtl">7/תאו כאן_____ מטרת (קנה/כיתה/פלגה/מחלקה) מטרת מיסוך על (שם מטרה/נ.צ), אזימוט במעלות (אזימוט) אורך מסך ,(200/400/600/800) בעשן, למשך (מס דקות) קטנות, לפי פקודה/ אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">הארה</span></p>
<p dir="rtl">7/תאו כאן____ מטרת (קנה/כיתה/פלגה/מחלקה) מטרת הארה על (שם מטרה/נ.צ), בתאורה ל- (מס דקות) קטנות, לפי פקודה/ אש עבור.</p>
</div>
</details>
<details style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); padding: 1.5rem; margin: 1rem 0; transition: all 0.3s ease; position: relative;" open="">
<summary style="font-size: 1.2rem; font-weight: 600; cursor: pointer; list-style: none; outline: none; display: flex; justify-content: space-between; align-items: center;"><strong id="docs-internal-guid-a6505eab-7fff-3eb4-9105-c74db8008911">תיקונים</strong><br><span class="arrow" style="display: inline-block; transition: transform 0.3s ease; font-size: 1.2rem;">▸</span></summary>
<div style="margin-top: 1rem; color: #333; line-height: 1.6;">
<p dir="rtl"><span style="text-decoration: underline;">תיקון אומדנה</span></p>
<p dir="rtl">7/תאו כאן_____ על מטרה (שם המטרה), באזימוט ת"מ (אזימוט ת"מ), ימינה/ שמאלה_____קצרים, יותר/פחות____ קצרים, ב- 1 נפיץ, לפי פקודה/אש עבור.</p>
<p dir="rtl">*תיקונים שמאלה/ימינה או יותר/פחות יתבצעו החל מ50 בקפיצות של 50.</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון וקטורי</span></p>
<p dir="rtl">7/תאו כאן_____בתיקון וקטורי על מטרה (שם המטרה) אזימוט לפצצה (אזימוט באלפיות)&nbsp; טווח לפצצה (טווח) קצרים,&nbsp; אזימוט למטרה (אזימוט באלפיות) טווח למטרה (טווח) קצרים, ב1 נפיץ, לפי פקודה/ אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון לפי נ.צ</span></p>
<p dir="rtl">7/תאו כאן_____ תיקון ב.נצ, נ.צ פגיעה (נ.צ), נ.צ מטרה (נ.צ),ב-1 ב נפיץ לפי פקודה/אש עבור.</p>
<p dir="rtl"><span style="text-decoration: underline;">תיקון רוחות שמיים</span></p>
<p dir="rtl">7/תאו כאן________קבל תיקון ברוחות שמיים על מטרה (שם מטרה) מזרח/ מערב _____ קצרים, צפון/דרום _______ קצרים, ב-1 נפיץ לפי פקודה/אש עבור.</p>
<p dir="rtl">*קפיצות של 50</p>
</div>
</details>
<p>&nbsp;</p>
`;

export { mortarsHtml };
