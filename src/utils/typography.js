import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

fairyGateTheme.googleFonts = [
  {
    name: "Work Sans",
    styles: ["400", "600"],
  },
  {
    name: "Quattrocento Sans",
    styles: ["400", "400i", "700"],
  },
  {
    name: "Prompt",
    styles: ["400", "600", "700"],
  },
]
fairyGateTheme.headerFontFamily = ["Work Sans", "Prompt", "sans-serif"]
fairyGateTheme.bodyFontFamily = ["Quattrocento Sans", "Prompt", "sans-serif"]
const linkColor = "#3f5773"
fairyGateTheme.overrideThemeStyles = () => ({
  a: {
    color: linkColor,
    textShadow: `none`,
    backgroundImage: `none`,
  },
})

const typography = new Typography(fairyGateTheme)
export const { scale, rhythm, options } = typography

export default typography
