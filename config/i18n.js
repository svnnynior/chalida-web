// Only one item MUST have the "default: true" key

module.exports = {
  th: {
    default: true,
    path: `th`,
    locale: `th-TH`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `th`,
    ogLanguage: `th_TH`,
    defaultTitle: `ใช้ i18n กับ Gatsby`,
    defaultDescription: `ตัวอย่างการใช้ Gatsby กับ i18n`,
  },
  en: {
    path: `en`,
    locale: `en-US`,
    dateFormat: `DD/MM/YYYY`,
    siteLanguage: `en`,
    ogLanguage: `en_US`,
    defaultTitle: `Using i18n with Gatsby`,
    defaultDescription: `Gatsby example site using MDX and dependency-free i18n`,
  },
}
