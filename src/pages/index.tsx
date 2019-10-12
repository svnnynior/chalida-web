import React, { useState, useEffect } from "react"

import SEO from "../components/SEO"
import useTranslations from "../components/useTranslation"
import styled, { keyframes } from "styled-components"

import parallaxImage from "../images/header-background.jpg"
import NavigationBar from "../components/NavigationBar"
import { device } from "../utils/device"
import Layout from "../components/Layout"

import hair_image from "../images/hair.png"
import eyebrow_image from "../images/eyebrow.png"

import ServiceCard from "../components/ServiceCard"
import useVisibilityTracking from "../components/useVisibilityTracking"
import { useSpring, animated } from "react-spring"
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
    height: 80vh;
  }
`

const HeaderText = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const textClipKeyframes = keyframes`
  100% {
    background-position: 200%;
  }
`

const HeaderTitle = styled.h1`
  margin-top: -100px;
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`

const SectionTitle = styled.h3`
  color: black;
  font-size: 40px;
  font-weight: 600;
  margin-top: 0px;
  margin-bottom: 20px;
`

const ServiceSectionContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

interface Service {
  id: number
  title: {
    th: string
    en: string
  }
  description: {
    th: string
    en: string
  }
  gotoUrl: string
  image: string
}
const SERVICES: Service[] = [
  {
    id: 0,
    title: {
      th: "ทำผม",
      en: "Hair",
    },
    description: {
      th: "ตัดผม, สระผม, ทำสีผม",
      en: "Cut, Shampoo, Dye, etc.",
    },
    gotoUrl: "/services",
    image: hair_image,
  },
  {
    id: 1,
    title: {
      th: "สัก 3 มิติ",
      en: "Paint",
    },
    description: {
      th: "สักคิ้ว, สักปาก",
      en: "Eyebrow Paint, Lips Paint",
    },
    gotoUrl: "/services",
    image: eyebrow_image,
  },
]
const IndexPage = () => {
  const { header_title, header_subtitle, services } = useTranslations()
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [serviceSectionRef, { isVisible }] = useVisibilityTracking({
    minElementOffset: {
      bottom: 100,
    },
    partiallyVisible: "bottom",
  })
  const serviceCardAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
  })

  const toggleNavbar = () => {
    setNavbarOpen(navbarOpen => !navbarOpen)
  }

  return (
    <>
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
      <Layout>
        <Section>
          <SectionTitle>{services}</SectionTitle>
          <ServiceSectionContent ref={serviceSectionRef}>
            {SERVICES.map(service => (
              <animated.div key={service.id} style={serviceCardAnimation}>
                <ServiceCard
                  title={service.title}
                  image={service.image}
                  gotoUrl={service.gotoUrl}
                  description={service.description}
                />
              </animated.div>
            ))}
          </ServiceSectionContent>
        </Section>
      </Layout>
    </>
  )
}

export default IndexPage
