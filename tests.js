import { Tinytest } from 'meteor/tinytest'
import { name as packageName } from 'meteor/colder:oauth-short-state'

Tinytest.add('colder:oauth-short-state - example', (test) => {
  test.equal(packageName, 'colder:oauth-short-state')
})
