import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { device } from "../utils/device"

const LayoutContainer = styled.div`
  padding: 0 2rem;
  @media ${device.laptopL} {
    padding: 0 10rem;
  }
`
const Footer = styled.footer`
  width: 100vw;
  position: relative;
  bottom: 0;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow-x: hidden;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`

interface Props {
  children?: any
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutContainer>
      <main>{children}</main>
      <Footer>© 2019 Chalida.com</Footer>
    </LayoutContainer>
  )
}

export default Layout
