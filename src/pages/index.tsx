import React, { useState } from "react"

import SEO from "../components/SEO"
import useTranslations from "../components/useTranslation"
import styled, { keyframes } from "styled-components"

import parallaxImage from "../images/header-background.jpg"
import NavigationBar from "../components/NavigationBar"
import { device } from "../utils/device"

interface ParallaxProps {
  imageUrl: string
}
const ParallaxImage = styled.div<ParallaxProps>`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${props => props.imageUrl});

  height: 100%;
  width: 100%;

  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  display: flex;
  flex-direction: column;
`

const ParallaxContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-color: black;

  @media ${device.laptop} {
    height: 90vh;
  }
`

const HeaderText = styled.div`
  text-align: center;
  margin-top: 15vh;
`
const textClipKeyframes = keyframes`
  100% {
    background-position: 200%;
  }
`

const HeaderTitle = styled.h1`
  color: white;
  font-size: 30px;
  background: linear-gradient(to right, #555, #fff, #555);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textClipKeyframes} 3s linear infinite;

  @media ${device.mobileM} {
    font-size: 40px;
  }

  @media ${device.mobileL} {
    font-size: 60px;
  }

  @media ${device.tablet} {
    font-size: 70px;
  }

  @media ${device.laptop} {
    font-size: 80px;
  }
`

const HeaderSubtitle = styled.h4`
  color: white;
  font-size: 16px;
  font-weight: 400;

  @media ${device.mobileM} {
    font-size: 24px;
  }

  @media ${device.tablet} {
    font-size: 32px;
  }
`
const IndexPage = () => {
  const { header_title, header_subtitle } = useTranslations()
  const [navbarOpen, setNavbarOpen] = useState(false)

  const toggleNavbar = () => {
    setNavbarOpen(navbarOpen => !navbarOpen)
  }

  const closeNavbar = () => {
    setNavbarOpen(false)
  }

  return (
    <div>
      <SEO title="Home" />
      <ParallaxContainer>
        <ParallaxImage imageUrl={parallaxImage}>
          <NavigationBar navbarOpen={navbarOpen} toggleNavbar={toggleNavbar} />
          <HeaderText>
            <HeaderTitle>{header_title}</HeaderTitle>
            <HeaderSubtitle>{header_subtitle}</HeaderSubtitle>
          </HeaderText>
        </ParallaxImage>
      </ParallaxContainer>
    </div>
  )
}

export default IndexPage
