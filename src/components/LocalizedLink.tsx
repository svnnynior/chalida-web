import React, { useContext } from "react"
import { Link } from "gatsby"
import locales from "../../config/i18n"
import { LocaleContext } from "./LocaleWrapper"

interface Props {
  to: string
  [key: string]: any
}

const LocalizedLink: React.FC<Props> = ({ to, ...props }) => {
  const { locale } = useContext(LocaleContext)

  const isIndex = to === `/`

  const path = locales[locale].default
    ? to
    : `/${locales[locale].path}${isIndex ? `` : `${to}`}`

  return <Link {...props} to={path} />
}

export default LocalizedLink
