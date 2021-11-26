module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                // theme colors
                pink: '#FFD1FA',
                blue: '#C2E2FF',
                purple: '#D2D1FF',
                orange: '#FFD5BE',

                // 5 shades of grey
                grey1: '#565656',
                grey2: '#9C9C9C',
                grey3: '#C6C6C6',
                grey4: '#EDEDED',
                grey5: '#F8F8F8',
            },
            width: {
                'event-base': '400px',
                'event-sm': '350px',
            },
            height: {
                'content-section-mobile': 'calc(100% - 50px)',
            },
            screens: {
                's-800': '800px',
                'projects-3': '1400px',
                '3xl': '1600px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
