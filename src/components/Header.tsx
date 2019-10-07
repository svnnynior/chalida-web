import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import LocalizedLink from "./LocalizedLink"

interface Props {
  siteTitle: string
}

const Header: React.FC<Props> = ({ siteTitle }) => (
  <header>
    <div>
      <h1 style={{ margin: 0 }}>
        <LocalizedLink to="/">{siteTitle}</LocalizedLink>
      </h1>
      <h1>
        <Link to="/en" hrefLang="en">
          ENGLISH
        </Link>
      </h1>
      <h1>
        <Link to="/" hrefLang="th">
          ภาษาไทย
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
