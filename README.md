# colder:oauth-short-state

The [colder:oauth-short-state](https://atmospherejs.com/colder/oauth/-short-state) package reduce [oauth](https://atmospherejs.com/meteor/oauth) state size ~50%. Useful for when your OAuth provider limit state size.

# Example

## Setup:

```bash
meteor add colder:oauth-short-state
```

## Improvement:

The origin implement `OAuth._stateParam` like this

```js
// https://github.com/meteor/meteor/blob/b8852dd7cc2909be39eab766b57954e225043b68/packages/oauth/oauth_client.js#L41
OAuth._stateParam = function (loginStyle, credentialToken, redirectUrl) {
  var state = {
    loginStyle: loginStyle,
    credentialToken: credentialToken,
    isCordova: Meteor.isCordova
  };

  if (loginStyle === 'redirect')
    state.redirectUrl = redirectUrl || ('' + window.location);

  return Base64.encode(JSON.stringify(state));
};
```

A normal example return **198 bytes**

```js
> encodeURIComponent(Base64.encode(JSON.stringify({
    loginStyle: 'redirect',
    credentialToken: Random.secret(),
    isCordova: false,
    redirectUrl: 'http://www.example.com'
  }))).length
198
```

Here we can reduce size to **118 bytes** by short keys length, remove falsy key, change string value to enum number.

```js
> const loginStyles = ['popup', 'redirect']
> encodeURIComponent(Base64.encode(JSON.stringify({
    l: 1 // loginStyles.indexOf('redirect')
    t: Random.secret(),
    r: 'http://www.example.com'
  }))).length
118
```

If you use another token (e.g. `Random.id()`) replace `Random.secret()`. You will get a smaller result **80 bytes**. This for oauth package developer.

```js
> encodeURIComponent(Base64.encode(JSON.stringify({
    l: 2,
    t: Random.id(),
    r: 'http://www.example.com'
  }))).length
80
```

