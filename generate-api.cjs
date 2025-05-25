const shell = require('shelljs')

const API_URL = 'http://localhost:8000/api-docs.json'

const output = 'src/interfaces/api-types.ts'

shell.exec(`npx openapi-typescript ${API_URL} --output ${output}`)
