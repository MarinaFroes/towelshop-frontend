import jwt_decode from 'jwt-decode'

import { DecodedData } from '../types'

export const decodeToken = (token: string) => {
  const jwtPayload: object | string = jwt_decode(token)

  const decodedUserData: DecodedData = jwtPayload as DecodedData

  return decodedUserData
}
