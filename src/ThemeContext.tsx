import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })
const modTheme = {
  ...dark,
  colors: {
    ...dark.colors,
    primary: "#c29551",
    secondary: "#c29551",
    borderColor: "#242424",
    background:
      "radial-gradient(50% 50% at 50% 50%, #bda98d 0%, #bda98d 100%);",
    textSubtle: "#c29551",
    text: "#c29551",
    tertiary: "hsl(0deg 0% 100%)",
    failure: "#d417c1",
    input: "#e6e6e6",
    success: "#a73f9c",
    navBorder: "#242424",
  },
  shadows: {
    ...dark.shadows,
    focus:
      "0px 0px 0px 1px #a33398, 0px 0px 0px 4px #a3339899;",
  },
  nav: {
    ...dark.nav,
    background: "#01091d",
  },
  // tooltip:{
  //   ...dark.tooltip,
  //   background:'red'
  // }
  card: { ...dark.card, background: "#242424" },
};
 console.log(modTheme)
const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={modTheme}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
