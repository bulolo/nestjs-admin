import { readFileSync } from 'fs'
import * as yaml from 'js-yaml';
import { join } from 'path'

let active = {
  local: 'config.local.yml',
  dev: 'config.dev.yml',
  prod: 'config.prod.yml'
}

export default () => {
  return yaml.load(readFileSync(join(__dirname, active[process.env.NODE_ENV] || active.prod), 'utf8')) as Record<string, any>
}
