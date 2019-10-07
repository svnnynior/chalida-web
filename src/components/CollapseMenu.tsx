import React from "react"
import styled from "styled-components"

import { useSpring, animated } from "react-spring"
import LocalizedLink from "./LocalizedLink"
import useTranslations from "./useTranslation"

interface Props {
  navbarOpen: boolean
  toggleNavbar: () => void
}
const CollapseMenu: React.FC<Props> = ({ navbarOpen, toggleNavbar }) => {
  const { services, about } = useTranslations()
  const menuAnimation = useSpring({ opacity: navbarOpen ? 1 : 0 })

  if (navbarOpen) {
    return (
      <CollapseWrapper style={menuAnimation}>
        <NavLinks>
          <li>
            <StyledLocalizedLink to="/services" onClick={toggleNavbar}>
              {services}
            </StyledLocalizedLink>
          </li>
          <li>
            <StyledLocalizedLink to="/about" onClick={toggleNavbar}>
              {about}
            </StyledLocalizedLink>
          </li>
        </NavLinks>
      </CollapseWrapper>
    )
  }
  return null
}

export default CollapseMenu

const CollapseWrapper = styled(animated.div)`
  background: black;
  position: fixed;
  top: 4.5rem;
  left: 0;
  right: 0;
`

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 1rem 1rem 2rem 2rem;
  margin: 0;

  & li {
    transition: all 300ms linear 0s;
  }
  & a {
    font-size: 1.4rem;
    line-height: 2;
    color: #dfe6e9;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: #fdcb6e;
      border-bottom: 1px solid #fdcb6e;
    }
  }
`

const StyledLocalizedLink = styled(LocalizedLink)`
  background: none;
  color: rgba(255, 255, 255, 0.9);

  &:hover {
    text-decoration: underline;
    color: white;
  }
`
