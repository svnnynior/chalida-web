import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import NavigationBar from "../components/NavigationBar"
import LocalizedLink from "../components/LocalizedLink"

const ServicesPage = () => (
  <Layout>
    <SEO title="Services" />
    <NavigationBar />
    <h1>Hi from the Services</h1>
    <p>Welcome to</p>
    <LocalizedLink to="/">Go back to the homepage</LocalizedLink>
  </Layout>
)

export default ServicesPage
