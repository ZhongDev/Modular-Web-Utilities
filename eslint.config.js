// ESLint Flat Config for ESLint v9
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
    // Ignore build artifacts
    { ignores: ['dist', 'build', 'coverage', 'node_modules'] },

    // App sources (TypeScript/React)
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
        ],
        languageOptions: {
            parser: tseslint.parser,
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // React hooks best practices
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Vite React Fast Refresh safety
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    }
)


