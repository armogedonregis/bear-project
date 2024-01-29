import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["var(--font-ubuntu)"],
        balsamiq: ["var(--font-balsamiq)"],
        worksans: ["var(--font-worksans)"],
      },
      borderWidth: {
        1: "1px"
      },
      borderRadius: {
        '15xl': '15px'
      },
      colors: {
        primary: "#3EA076",
        grayBtn: "#CDCDCD",
        tertiary: "#FF5151",
        textPlaceholder: "#8D8D8D",
        borderPrimary: "#DFDFDF",
        textBlack: "#202020",
        bgGray: "#F9F9F9",
        borderGray: "#DFDFDF"
      },
      transitionProperty: {
        position: 'right, left, top, bottom, margin, padding',
        textColor: 'color',
      },
      keyframes: {
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-out': 'fade-out 250ms ease-in-out',
        'fade-in': 'fade-in 250ms ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'aside-scrollbars': (value) => {
            const track = value === 'light' ? '100' : '900'
            const thumb = value === 'light' ? '300' : '600'
            const color = value === 'light' ? 'gray' : value

            return {
              scrollbarWidth: 'thin',
              scrollbarColor: `${theme(`colors.${color}.${thumb}`)} ${theme(
                `colors.${color}.${track}`
              )}`,
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme(`colors.${color}.${track}`),
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '0.25rem',
                backgroundColor: theme(`colors.${color}.${thumb}`),
              },
            }
          },
        },
        { values: theme('asideScrollbars') }
      )
    }),
  ],
};
export default config;
