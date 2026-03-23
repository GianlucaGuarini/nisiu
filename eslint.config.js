import riot from 'eslint-config-riot'

export default [
  ...riot,
  {
    languageOptions: {
      globals: {
        firebase: 'readonly',
        opts: 'readonly',
        componentHandler: 'readonly'
      }
    },
    rules: {
      'fp/no-mutation': 'off'
    }
  }
]
