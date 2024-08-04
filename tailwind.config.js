/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  separator: ":",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        //main background color
        bkg: {
          1: {
            light: "rgb(var(--color-bkg--light) / <alpha-value>)",
            dark: "rgb(var(--color-bkg--dark) / <alpha-value>)",
          },
          2: {
            light: "#FFF",
            dark: "#1f2937",
          },
          3: {
            light: "#f9fafb",
            dark: "#374151",
          },
        },
        //components background color (input component)
        secondary: {
          light: "#f9fafb",
          dark: "#374151",
        },
        //addition text colors beside white and black
        content: {
          1: "#111827",
          2: "#9ca3af",
        },
        //primary theme of the app (cyan)
        primary: {
          light: "#06b6d4",
          dark: "#06b6d4",
        },
        //color around primary theme (ring)
        effect: {
          light: "#a8cfda",
          dark: "#155e75",
        },
        cyan: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          950: "#083344",
        },
        gray: {
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
        },
        yellow: {
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
        },
        white: "#FFF",
        black: "#000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        myLayout: "100rem",
        adminLayout: "100rem",
      },
      minHeight: {
        myLayout: "40rem",
        adminLayout: "40rem",
      },
      boxShadow: {
        general:
          "1px 2px 10px 3px rgba(0, 0, 0, 0.3), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
      fontSize: {
        h1: "2rem",
        h2: "1.4rem",
        h3: "1rem",
        content: "14px",
        icon_md: "5px",
        icon_lg: "20px",
        icon_xl: "26px",
      },
      textShadow: {
        404: "2px 2px 0px #c9c9c9, -2px -2px 0px #c9c9c9",
        "404-blue":
          "2px 2px 0px #0957ff, -2px -2px 0px #0957ff, 0px 0px 8px #1150d6",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-4xx": {
          textShadow: "2px 2px 0px #c9c9c9, -2px -2px 0px #c9c9c9",
        },
        ".text-shadow-4xx-blue": {
          textShadow:
            "2px 2px 0px #87ceeb, -2px -2px 0px #87ceeb, 0px 0px 8px #add8e6",
        },
      });
    },
  ],
};
