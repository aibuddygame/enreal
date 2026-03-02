/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                obsidian: '#0D0D12',
                champagne: '#C9A84C',
                ivory: '#FAF8F5',
                slate: '#2A2A35',
                'slate-light': '#3A3A48',
                background: '#FFFFFF',
                foreground: '#1C1C1E',
                primary: '#2563EB',
                'primary-foreground': '#FFFFFF',
                secondary: '#F5F5F7',
                'secondary-foreground': '#1C1C1E',
                'muted-foreground': '#8E8E93',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
                '5xl': '3rem',
            },
        },
    },
    plugins: [],
}
