import { DefaultTheme } from "react-native-paper";

interface ITheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    info: string;
  };
}

const theme: ITheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FD6500",
    secondary: "#1C1C1C",
    tertiary: "#FDFEFF",
    info: "#2196F3",
  },
};

export default theme
