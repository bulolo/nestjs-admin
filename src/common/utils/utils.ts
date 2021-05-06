import * as crypto from 'crypto'

export function cryptoPassword(password: string) {
  const hmac = crypto.createHmac('sha256', 'race')
  return hmac.update(password).digest('hex')
}