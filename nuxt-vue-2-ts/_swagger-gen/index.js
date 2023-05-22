const { exec } = require('child_process')
const fs = require('fs')
const axios = require('axios')
require('dotenv').config()

const __main = async () => {
  const response = await axios.get(process.env.API_DOCS_JSON, {
    auth: {
      username: process.env.API_DOCS_AUTH_USERNAME,
      password: process.env.API_DOCS_AUTH_PASSWORD
    }
  })

  fs.writeFile(
    './_swagger-docs-generated.json',
    JSON.stringify(response.data),
    () => {
      exec(
        'sta -p ./_swagger-docs-generated.json -n _api-types.ts --no-client',
        () => {
          fs.unlink('./_swagger-docs-generated.json', () => {})
        }
      )
    }
  )
}

__main()
