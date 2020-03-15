import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./LocaleWrapper"

function useTranslations() {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = useContext(LocaleContext)
  const { rawData } = useStaticQuery(query)
  // Simplify the response from GraphQL
  const simplified = rawData.edges.map((item: any) => {
    return {
      name: item.node.name,
      translations: item.node.translations,
    }
  })

  // Only return translations for the current locale
  const { translations } = simplified.filter(
    (lang: any) => lang.name === locale
  )[0]

  return translations
}

export default useTranslations

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          translations: childTranslationsJson {
            services
            about
            contact
            header_title
            header_subtitle
            details
          }
        }
      }
    }
  }
`
