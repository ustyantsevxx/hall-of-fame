export const RUNTIME_VARS = {
  /** @example https://api-host.dev */
  API_HOST: process.env.API_HOST as string,

  UNLEASH: {
    URL: process.env.UNLEASH_URL,
    CLIENT_KEY: process.env.UNLEASH_CLIENT_KEY,
    APP_NAME: process.env.UNLEASH_APP_NAME,
    ENVIRONMENT: process.env.UNLEASH_ENVIRONMENT,
    REFRESH_INTERVAL: process.env.UNLEASH_REFRESH_INTERVAL
      ? +process.env.UNLEASH_REFRESH_INTERVAL
      : undefined
  }
}
