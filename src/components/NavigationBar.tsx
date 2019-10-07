import React, { useState } from "react"

import styled from "styled-components"
import LocalizedLink from "./LocalizedLink"
import { Link } from "gatsby"
import useTranslations from "./useTranslation"
import { useSpring, config, animated } from "react-spring"
import { device } from "../utils/device"
import Burgermenu from "./BurgerMenu"
import CollapseMenu from "./CollapseMenu"

const NavBar = styled(animated.nav)`
  background-color: rgba(0, 0, 0, 0);
  color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const NavLinks = styled(animated.ul)`
  list-style-type: none;
`

const StyledLink = styled(Link)`
  background: none;
  color: rgba(255, 255, 255, 0.5);
  margin: 10px;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`

const StyledLocalizedLink = styled(LocalizedLink)`
  background: none;
  color: rgba(255, 255, 255, 0.5);
  margin: 10px;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`

const LogoText = styled.span`
  color: white;
  font-weight: 600;
  font-size: 32px;
`

const BurgerWrapper = styled.div`
  display: inline;
  @media ${device.tablet} {
    display: none;
  }
`

const NonBurgerWrapper = styled.div`
  display: none;
  @media ${device.tablet} {
    display: inline;
  }
`

interface Props {
  toggleNavbar: () => void
  navbarOpen: boolean
}
const NavigationBar: React.FC<Props> = ({ toggleNavbar, navbarOpen }) => {
  const { services, about } = useTranslations()

  const barAnimation = useSpring({
    from: { transform: "translate3d(0, -10rem, 0)" },
    transform: "translate3d(0, 0, 0)",
  })

  const linkAnimation = useSpring({
    from: { transform: "translate3d(0, 30px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 800,
    config: config.wobbly,
  })

  return (
    <>
      <CollapseMenu navbarOpen={navbarOpen} toggleNavbar={toggleNavbar} />
      <NavBar style={barAnimation}>
        <BurgerWrapper>
          <Burgermenu navbarOpen={navbarOpen} toggleNavbar={toggleNavbar} />
        </BurgerWrapper>
        <NonBurgerWrapper>
          <LogoText>CHALIDA</LogoText>
        </NonBurgerWrapper>
        <NonBurgerWrapper>
          <NavLinks style={linkAnimation}>
            <StyledLocalizedLink to="/services">{services}</StyledLocalizedLink>
            <StyledLocalizedLink to="/about">{about}</StyledLocalizedLink>
          </NavLinks>
        </NonBurgerWrapper>
        <span>
          <StyledLink to="/" hrefLang="th">
            ไทย
          </StyledLink>
          |
          <StyledLink to="/en" hrefLang="en">
            ENG
          </StyledLink>
        </span>
      </NavBar>
    </>
  )
}

export default NavigationBar
