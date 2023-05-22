const snakeCase = require('snake-case')
const kebabCase = require('param-case')

module.exports = {
  prompt: async ({ prompter }) => {
    const { name } = await prompter.prompt({
      type: 'input',
      name: 'name',
      message: 'Module name (exact PascalCase name)'
    })

    const { endpoint } = await prompter.prompt({
      type: 'input',
      name: 'endpoint',
      message: `API endpoint (suggested: ${snakeCase(name)})`,
      initial: `${snakeCase(name)}`
    })

    let moduleFolder = kebabCase(name)

    if (endpoint !== snakeCase(name)) {
      const { _moduleFolder } = await prompter.prompt({
        type: 'input',
        name: '_moduleFolder',
        message: `Module folder name (suggested: ${kebabCase(name)})`,
        initial: `${kebabCase(name)}`
      })
      moduleFolder = _moduleFolder
    }

    return {
      name,
      endpoint,
      moduleFolder
    }
  }
}
