import process from 'process'

export const JWT_KEY = process.env.JWT_KEY || 'developmentpurpose'
export const SERVER_PORT = process.env.PORT || 3000
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/curhatan'
export const TOKEN_VALIDITY_PERIOD = process.env.TOKEN_VALIDITY_PERIOD || 604800
