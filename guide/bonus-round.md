# Bonus Round

If you've made it this far, you have a deployed microservice in a dev
environment. Congratulations! Check out the
[Serverless CLI docs](http://docs.serverless.com/docs/commands-overview) for
ways to take this project further. In the meantime, here are some bonus tasks!

# Add Coverage

You've got unit tests, but what about coverage? You can use
[Istanbul](https://github.com/gotwarlost/istanbul) to provide you with coverage
reports.

```
npm install --save-dev istanbul@1.1.0-alpha.1
```

Create a `.istanbul.yml` file in your project root to exclude test files from
coverage.

```yml
instrumentation:
  excludes: ['*.spec.js']
```

Add a `coverage` npm script to your `package.json`.

```json
"coverage": "istanbul cover node_modules/mocha/bin/_mocha"
```

Run `npm run coverage` to generate a coverage report in the `coverage`
directory.

> **Extra Bonus: Get code coverage to 100%!**

# Get rid of that annoying console output during unit tests

Install the [mute](https://github.com/shannonmoeller/mute) module.

```
npm install --save-dev mute
```

Create a `mute.d.ts` type definition ([GitHub link](https://github.com/benjaminkitt/serverless-microservice-guide/blob/bonus-round/functions/urlToMd/mute.d.ts).)

```typescript
declare module "mute" {
  function Mute(): Function;
  namespace Mute {}
  export = Mute
}
```

Reference the type definition in `handler.spec.ts` and import mute.

```typescript
/// <reference path="mute.d.ts"/>
import * as mute from 'mute'
```

Update the `beforeEach` function to use mute.

```typescript
beforeEach(async () => {
  request = nock('http://www.bbc.com')
  .get('/culture/story/20160704-mount-rushmore-at-75-how-did-it-come-to-be')
  .reply(200, testHtml, {
    'content-type': 'text/html; charset=utf-8',
  })

  cb = stub()

  let unmute: Function = mute()
  await handler(evt, {}, cb)
  unmute()
})
```

[View the updated handler.spec.ts on GitHub](https://github.com/benjaminkitt/serverless-microservice-guide/blob/bonus-round/functions/urlToMd/handler.spec.ts).
