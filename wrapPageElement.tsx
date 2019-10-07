import React from "react"
import LocaleWrapper from "./src/components/LocaleWrapper"

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
interface Props {
  element: Element
  props: any
}

const wrapPageElement: React.FC<Props> = ({ element, props }) => {
  return <LocaleWrapper {...props}>{element}</LocaleWrapper>
}
export default wrapPageElement
