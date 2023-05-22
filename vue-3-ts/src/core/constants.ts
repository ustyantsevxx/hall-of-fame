export const ENV_VARS = {
  API_HOST: import.meta.env.VITE_API_HOST as string,
  MOCK_API: import.meta.env.VITE_MOCK_API as string,

  VITE_ENABLE_ONLY_EMAIL_VERIFICATION:
    import.meta.env.VITE_ENABLE_ONLY_EMAIL_VERIFICATION === '1',

  UNLEASH: {
    APP_NAME: import.meta.env.VITE_UNLEASH_APP_NAME,
    CLIENT_KEY: import.meta.env.VITE_UNLEASH_CLIENT_KEY,
    URL: import.meta.env.VITE_UNLEASH_URL,
    ENVIRONMENT: import.meta.env.VITE_UNLEASH_ENVIRONMENT,
    REFRESH_INTERVAL: import.meta.env.VITE_UNLEASH_REFRESH_INTERVAL
      ? +import.meta.env.VITE_UNLEASH_REFRESH_INTERVAL
      : undefined
  }
}
