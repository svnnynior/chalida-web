import React, { useContext } from "react"
import styled from "styled-components"
import LocalizedLink from "./LocalizedLink"
import useTranslations from "./useTranslation"
import { LocaleContext } from "./LocaleWrapper"

const CardContainer = styled.div`
  width: 250px;
  margin: 20px;
  padding: 10px;
  transition: 0.3s;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :hover {
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.2);
  }
`

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0px;
`

const Description = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: #aaa;
`

const StyledLocalizedLink = styled(LocalizedLink)`
  background: none;

  &:hover {
    text-decoration: underline;
  }
`

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 0px;
`

interface Props {
  title: {
    th: string
    en: string
  }
  description: {
    th: string
    en: string
  }
  image: string
  gotoUrl: string
}
const ServiceCard: React.FC<Props> = ({
  title,
  image,
  gotoUrl,
  description,
}) => {
  const { details } = useTranslations()
  const { locale } = useContext(LocaleContext)

  const titleText = locale === "th" ? title.th : title.en
  const descriptionText = locale === "th" ? description.th : description.en

  return (
    <CardContainer>
      <Image src={image} />
      <Title> {titleText} </Title>
      <Description> {descriptionText} </Description>
      <StyledLocalizedLink to={gotoUrl}>{details} ></StyledLocalizedLink>
    </CardContainer>
  )
}

export default ServiceCard
