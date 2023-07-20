module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
        'plugin:prettier/recommended',
        'prettier'
    ],
    plugins: [],
    rules: {
        'no-undef': 'off',
        quotes: [2, 'single', { avoidEscape: true }],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
            },
        ],
    },
}
