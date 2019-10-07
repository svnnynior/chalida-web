import React from "react"
import locales from "../../config/i18n"

interface LocaleContext {
  locale: keyof typeof locales
}
export const LocaleContext = React.createContext<LocaleContext>({
  locale: "th",
})

interface Props {
  children?: any
  pageContext: {
    locale: keyof typeof locales
  }
}
const LocaleWrapper: React.FC<Props> = ({
  children,
  pageContext: { locale },
}) => {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleWrapper
