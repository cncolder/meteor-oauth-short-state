import { Log } from 'meteor/meteor'
import { OAuth } from 'meteor/oauth'
import { loginStyles } from './common'

OAuth._generateState = function (loginStyle, credentialToken, redirectUrl) {
  return new Buffer(JSON.stringify({
    l: loginStyles.indexOf(loginStyle),
    t: credentialToken,
    r: redirectUrl
  })).toString('base64')
}

OAuth._stateFromQuery = function (query) {
  let string
  try {
    string = new Buffer(query.state, 'base64').toString('binary')
  } catch (e) {
    Log.warn('Unable to base64 decode state from OAuth query: ' + query.state)
    throw e
  }

  try {
    let json = JSON.parse(string)
    return {
      loginStyle: loginStyles[json.l],
      credentialToken: json.t,
      isCordova: Boolean(json.c),
      redirectUrl: json.r
    }
  } catch (e) {
    Log.warn('Unable to parse state from OAuth query: ' + string)
    throw e
  }
}
