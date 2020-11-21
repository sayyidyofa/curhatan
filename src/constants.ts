import path from 'path'
import process from 'process'

export const BASE_PATH = path.join(__dirname + '../public/')
export const JWT_KEY = process.env.JWT_KEY || 'developmentpurpose'
// export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'developmentpurpose'