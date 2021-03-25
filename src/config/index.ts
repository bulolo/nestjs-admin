import { readFileSync } from 'fs'
import * as yaml from 'js-yaml';
import { join } from 'path'
const LOCAL = 'config.local.yml'
const DEV = 'config.dev.yml'
const PROD = 'config.prod.yml'

const active = LOCAL

export default () => {
  return yaml.load(readFileSync(join(__dirname, active), 'utf8')) as Record<string, any>
}
