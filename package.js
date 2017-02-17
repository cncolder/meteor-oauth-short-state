/* eslint-env meteor */
Package.describe({
  name: 'colder:oauth-short-state',
  version: '0.1.0',
  summary: 'Reduce OAuth state size',
  documentation: 'README.md',
  git: 'https://github.com/cncolder/meteor-oauth-short-state.git'
})

Package.onUse(function (api) {
  api.versionsFrom('1.4.2.7')

  api.use([
    'ecmascript',
    'oauth'
  ])

  api.mainModule('client.js', 'client')
  api.mainModule('server.js', 'server')
})

Package.onTest(function (api) {
  api.use([
    'ecmascript',
    'tinytest',
    'colder:oauth-short-state'
  ])

  api.mainModule('tests.js')
})
