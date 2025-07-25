/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mvOrange: '#0F5BC0',
        mvGreen: '#99cc66',
        darkGreen: '#006B3D',
        darkRed: '#d3212C',
        darkBlack: '#212121',
        lightBlack: '#414141',
        lightGrey: '#f5f5f5',
      },
      screens: {
        sm: '0px',
        md: '800px',
        lg: '1200px',
      },
    },
    fontSize: {
      xs: ['11px', '16px'],
      sm: ['14px', '20px'],
      base: ['18px', '24px'],
      lg: ['22px', '28px'],
      xl: ['26px', '32px'],
      '2xl': ['29px', '36px'],
      '3xl': ['32px', '42px'],
      '5xl': ['52px', '64px'],
    },
    fontFamily: {
      sans: ['Libre_Franklin', 'Courier', 'ui-sans-serif', 'system-ui'],
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.flexCol': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
        '.flexRow': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        },
        '.clipPathCircle': {
          clipPath: 'circle(50% at 50% 50%)',
        },
      })
    },
  ],
}
