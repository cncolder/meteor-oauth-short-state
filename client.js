import { Meteor } from 'meteor/meteor'
import { OAuth } from 'meteor/oauth'
import { Base64 } from 'meteor/base64'
import { loginStyles } from './common'

OAuth._stateParam = function (loginStyle, credentialToken, redirectUrl) {
  let state = {
    l: loginStyles.indexOf(loginStyle),
    t: credentialToken
  }

  if (Meteor.isCordova) {
    state.c = true
  }

  if (loginStyle === 'redirect') {
    state.r = redirectUrl || ('' + window.location)
  }

  return Base64.encode(JSON.stringify(state))
}
