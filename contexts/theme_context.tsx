import React,{ FC, useState } from "react";
import { ThemeType } from "../types/types";

interface PropsType {
    children: any
}

export const ThemeContext = React.createContext<ThemeType | null>(null);

const ThemeProvider: FC<PropsType> = ({ children }) => {
    const current_hours = new Date(Date.now()).getHours()
    const actual_theme = current_hours >= 6 && current_hours < 18 ? "day" : "night"
    const [colorTheme, setColorTheme] = useState<string>(actual_theme)

    const altern_theme = () => {
        if(colorTheme == "day"){
            setColorTheme("night")
        }else{
            setColorTheme("day")
        }
    };

    return <ThemeContext.Provider value={{color_theme: colorTheme, altern_theme}}>
      {children}
    </ThemeContext.Provider>;
};

export default ThemeProvider;