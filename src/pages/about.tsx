import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import NavigationBar from "../components/NavigationBar"
import LocalizedLink from "../components/LocalizedLink"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <NavigationBar />
    <h1>Hi from the About Page</h1>
    <p>Welcome to about page</p>
    <LocalizedLink to="/">Go back to the homepage</LocalizedLink>
  </Layout>
)

export default AboutPage
