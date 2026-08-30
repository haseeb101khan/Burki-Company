import type { Country, SelectOption } from "../types";

/**
 * PROTOTYPE SOURCE DATA — not for direct import by pages or components.
 * Reach this only through `lib/data/form.ts`.
 *
 * Option lists for the quote request form. These live in the data layer rather
 * than inside the form component for the same reason everything else does: the
 * client will want to edit the timeframe wording and the market list without a
 * developer, and that means one place to point a CMS at later.
 */

/**
 * Countries and their international dialling codes.
 *
 * Stored as `[ISO 3166-1 alpha-2, name, dialling code]` tuples purely to keep
 * a long list readable — `getCountries()` expands them into objects, so no
 * consumer ever sees the tuple form.
 *
 * The list is deliberately global. Company positioning is nationwide and no
 * export markets have been confirmed yet (see `_sources/site.ts`), so the form
 * must not quietly decide who is allowed to enquire.
 */
const COUNTRY_TUPLES: readonly (readonly [string, string, string])[] = [
  ["AF", "Afghanistan", "93"],
  ["AL", "Albania", "355"],
  ["DZ", "Algeria", "213"],
  ["AO", "Angola", "244"],
  ["AR", "Argentina", "54"],
  ["AM", "Armenia", "374"],
  ["AU", "Australia", "61"],
  ["AT", "Austria", "43"],
  ["AZ", "Azerbaijan", "994"],
  ["BH", "Bahrain", "973"],
  ["BD", "Bangladesh", "880"],
  ["BY", "Belarus", "375"],
  ["BE", "Belgium", "32"],
  ["BJ", "Benin", "229"],
  ["BT", "Bhutan", "975"],
  ["BO", "Bolivia", "591"],
  ["BA", "Bosnia and Herzegovina", "387"],
  ["BW", "Botswana", "267"],
  ["BR", "Brazil", "55"],
  ["BN", "Brunei", "673"],
  ["BG", "Bulgaria", "359"],
  ["BF", "Burkina Faso", "226"],
  ["KH", "Cambodia", "855"],
  ["CM", "Cameroon", "237"],
  ["CA", "Canada", "1"],
  ["TD", "Chad", "235"],
  ["CL", "Chile", "56"],
  ["CN", "China", "86"],
  ["CO", "Colombia", "57"],
  ["CD", "Congo (DRC)", "243"],
  ["CG", "Congo (Republic)", "242"],
  ["CR", "Costa Rica", "506"],
  ["CI", "Côte d'Ivoire", "225"],
  ["HR", "Croatia", "385"],
  ["CY", "Cyprus", "357"],
  ["CZ", "Czechia", "420"],
  ["DK", "Denmark", "45"],
  ["DJ", "Djibouti", "253"],
  ["DO", "Dominican Republic", "1"],
  ["EC", "Ecuador", "593"],
  ["EG", "Egypt", "20"],
  ["SV", "El Salvador", "503"],
  ["ER", "Eritrea", "291"],
  ["EE", "Estonia", "372"],
  ["ET", "Ethiopia", "251"],
  ["FI", "Finland", "358"],
  ["FR", "France", "33"],
  ["GA", "Gabon", "241"],
  ["GE", "Georgia", "995"],
  ["DE", "Germany", "49"],
  ["GH", "Ghana", "233"],
  ["GR", "Greece", "30"],
  ["GT", "Guatemala", "502"],
  ["GN", "Guinea", "224"],
  ["HN", "Honduras", "504"],
  ["HK", "Hong Kong", "852"],
  ["HU", "Hungary", "36"],
  ["IS", "Iceland", "354"],
  ["IN", "India", "91"],
  ["ID", "Indonesia", "62"],
  ["IR", "Iran", "98"],
  ["IQ", "Iraq", "964"],
  ["IE", "Ireland", "353"],
  ["IL", "Israel", "972"],
  ["IT", "Italy", "39"],
  ["JM", "Jamaica", "1"],
  ["JP", "Japan", "81"],
  ["JO", "Jordan", "962"],
  ["KZ", "Kazakhstan", "7"],
  ["KE", "Kenya", "254"],
  ["KW", "Kuwait", "965"],
  ["KG", "Kyrgyzstan", "996"],
  ["LA", "Laos", "856"],
  ["LV", "Latvia", "371"],
  ["LB", "Lebanon", "961"],
  ["LY", "Libya", "218"],
  ["LT", "Lithuania", "370"],
  ["LU", "Luxembourg", "352"],
  ["MG", "Madagascar", "261"],
  ["MW", "Malawi", "265"],
  ["MY", "Malaysia", "60"],
  ["MV", "Maldives", "960"],
  ["ML", "Mali", "223"],
  ["MT", "Malta", "356"],
  ["MR", "Mauritania", "222"],
  ["MU", "Mauritius", "230"],
  ["MX", "Mexico", "52"],
  ["MD", "Moldova", "373"],
  ["MN", "Mongolia", "976"],
  ["ME", "Montenegro", "382"],
  ["MA", "Morocco", "212"],
  ["MZ", "Mozambique", "258"],
  ["MM", "Myanmar", "95"],
  ["NA", "Namibia", "264"],
  ["NP", "Nepal", "977"],
  ["NL", "Netherlands", "31"],
  ["NZ", "New Zealand", "64"],
  ["NI", "Nicaragua", "505"],
  ["NE", "Niger", "227"],
  ["NG", "Nigeria", "234"],
  ["MK", "North Macedonia", "389"],
  ["NO", "Norway", "47"],
  ["OM", "Oman", "968"],
  ["PK", "Pakistan", "92"],
  ["PS", "Palestine", "970"],
  ["PA", "Panama", "507"],
  ["PG", "Papua New Guinea", "675"],
  ["PY", "Paraguay", "595"],
  ["PE", "Peru", "51"],
  ["PH", "Philippines", "63"],
  ["PL", "Poland", "48"],
  ["PT", "Portugal", "351"],
  ["QA", "Qatar", "974"],
  ["RO", "Romania", "40"],
  ["RU", "Russia", "7"],
  ["RW", "Rwanda", "250"],
  ["SA", "Saudi Arabia", "966"],
  ["SN", "Senegal", "221"],
  ["RS", "Serbia", "381"],
  ["SL", "Sierra Leone", "232"],
  ["SG", "Singapore", "65"],
  ["SK", "Slovakia", "421"],
  ["SI", "Slovenia", "386"],
  ["SO", "Somalia", "252"],
  ["ZA", "South Africa", "27"],
  ["KR", "South Korea", "82"],
  ["SS", "South Sudan", "211"],
  ["ES", "Spain", "34"],
  ["LK", "Sri Lanka", "94"],
  ["SD", "Sudan", "249"],
  ["SE", "Sweden", "46"],
  ["CH", "Switzerland", "41"],
  ["SY", "Syria", "963"],
  ["TW", "Taiwan", "886"],
  ["TJ", "Tajikistan", "992"],
  ["TZ", "Tanzania", "255"],
  ["TH", "Thailand", "66"],
  ["TG", "Togo", "228"],
  ["TT", "Trinidad and Tobago", "1"],
  ["TN", "Tunisia", "216"],
  ["TR", "Türkiye", "90"],
  ["TM", "Turkmenistan", "993"],
  ["UG", "Uganda", "256"],
  ["UA", "Ukraine", "380"],
  ["AE", "United Arab Emirates", "971"],
  ["GB", "United Kingdom", "44"],
  ["US", "United States", "1"],
  ["UY", "Uruguay", "598"],
  ["UZ", "Uzbekistan", "998"],
  ["VE", "Venezuela", "58"],
  ["VN", "Vietnam", "84"],
  ["YE", "Yemen", "967"],
  ["ZM", "Zambia", "260"],
  ["ZW", "Zimbabwe", "263"],
];

/** Home market, pinned to the top of both country selects. */
export const HOME_COUNTRY = "PK";

export const countries: Country[] = COUNTRY_TUPLES.map(([code, name, dialCode]) => ({
  code,
  name,
  dialCode,
}));

/**
 * When a quote is actually wanted. Drives how sales triages the enquiry, so
 * the wording is about the buyer's decision, not a vague "urgency" scale.
 */
export const purchaseTimeframes: SelectOption[] = [
  { value: "immediate", label: "Immediately — ready to order" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "6-plus-months", label: "6 months or more" },
  { value: "budgeting", label: "Budgeting / planning only" },
];

/** How the buyer would rather be reached. WhatsApp is first for a reason. */
export const contactMethods: SelectOption[] = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone call" },
  { value: "email", label: "Email" },
];
