import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C5530',  // 竹青
          light: '#4A7C59',
        },
        secondary: '#8B4513',  // 赭石
        accent: '#D4AF37',     // 泥金
        background: '#FEFDF8', // 宣纸白
        surface: '#FFFEFB',    // 纯白
        border: '#E8E6E1',     // 边框
      },
      fontFamily: {
        // 标题依然保留更有韵味的宋体
        serif: ['"Noto Serif SC"', '"Songti SC"', '"SimSun"', 'serif'],
        // ✅ 修改这里：加入 'YouYuan'(幼圆) 和 'STXihei'(细黑) 作为首选
        sans: ['"YouYuan"', '"STXihei"', '"Microsoft YaHei Light"', '"Microsoft YaHei"', '"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;