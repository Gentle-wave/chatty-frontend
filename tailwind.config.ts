import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        knewave: ['Knewave', 'cursive'],
        // inter: ["Inter", "sans-serif"],
        // sans: ["Open Sans", "sans-serif"],
        // sora: ["Sora", "sans-serif"],
        // poppins: ["Poppins", "sans-serif"]
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        bounce: 'bounce 2s infinite',
      },
      colors: {
        textFaded: "#4E4E4E",
        faded: "#C6C6C6",
        textColor: '#181818',
        accent: "#03B7F4",
        accent2: "#3E49BF",
        accent3: "#EEDC18",
        green: {
          50: "#30AF5B",
          90: "#292C27",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
        orange: {
          50: "#FF814C",
        },
        blue: {
          70: "#021639",
        },
        yellow: {
          50: "#FEC601",
        },
        primary: "#ffff",
      },
      backgroundImage: {
        "bg-img-1": "url('/img-1.png')",
        "bg-img-2": "url('/img-2.png')",
        "feature-bg": "url('/feature-bg.png')",
        pattern: "url('/pattern.png')",
        "pattern-2": "url('/pattern-bg.png')",
      },
      screens: {
        sxl: "1180px",
        xs: "500px",
        "sm-md": "700px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
      fontSize: {
        "medium-size": "40px",
        "semi-medium-size": "30px",
        normal: "20px",
        small: "15px",
        big: "60px",
        veryBig: "80px",
        massive: "100px",
      },
    },
  },
  plugins: [],
} satisfies Config;
