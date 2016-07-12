# Step 4 - Adding unit tests

Unit tests are extremely important factor when developing a robust microservice.
You'll be using the [Mocha](https://mochajs.org/) unit test runner, along with
the [Chai](http://chaijs.com/) assertion library, [Sinon](http://sinonjs.org/)
mocking library and [Nock](https://github.com/node-nock/nock) for mocking http requests.

## Install the project dependencies and type definitions

```
npm install --save-dev mocha sinon chai sinon-chai nock
typings install --save-dev --global dt~mocha dt~sinon dt~chai dt~sinon-chai dt~nock
```

## Create configuration file

Start by creating a `test` folder in the project root. Next, create a
`mocha.opts` [(GitHub link)](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-4/test/mocha.opts) file with the following configuration:

```
./functions/**/*.spec.js

--reporter spec
--ui bdd
--recursive
--timeout 5000
--bail
--watch-extensions js,json
```

## Write some tests

Start by creating a `handler.spec.ts` file in the `functions/urlToMd` folder.
This is where the unit tests will go.

### Import libraries and the lambda handler

At the top of `handler.spec.ts`, import the following dependencies:

```typescript
import { use, expect } from 'chai'
import { stub, match } from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as nock from 'nock'
import { handler } from './handler'
```

### Set up

Tell chai to use the sinon-chai extension:

```javascript
use(sinonChai)
```

Set up the mock data for the tests. You'll use the same event.json file that the
serverless framework created for testing purposes.

```typescript
let evt = require('./event.json')
let testHtml = `<!DOCTYPE html>
  <html>
    <head><title>This is an article title</title></head>
    <body>
      <h1>This is an article title</h1>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada
      fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies
      eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
    </body>
  </html>`
```

Create the variables that you'll assert against

```typescript
let request: nock.Scope
let cb: Function
```

### Write the tests

You want to ensure that your handler
1. retrieves the supplied url
2. responds with the appropriate markdown.

```typescript
describe('The markdown function', () => {
  beforeEach(async () => {
    // Stub out the test URL. In this case, a BBC article about Mount Rushmore.
    request = nock('http://www.bbc.com')
    .get('/culture/story/20160704-mount-rushmore-at-75-how-did-it-come-to-be')
    .reply(200, testHtml, {
      'content-type': 'text/html; charset=utf-8',
    })

    // Create a Sinon stub in place of Lambda's callback
    cb = stub()

    // Call handler with mocks
    await handler(evt, {}, cb)
  })

  it('should retrieve the provided url', () => {
    expect(request.isDone()).to.be.true
  })

  it('should return some markdown', () => {
    expect(cb).to.have.been.calledWith(null, match({
      title: match('This is an article title'),
      content: match('Pellentesque habitant morbi tristique senectus et netus')
    }))
  })
})
```

[View the finished file on GitHub](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-4/functions/urlToMd/handler.spec.ts)

## Update your npm scripts

Update your npm test script in `package.json` to run mocha, and add a `tdd`
script that will continuously run your tests as you write the handler.

```json
"scripts": {
  "test": "mocha",
  "tdd": "tsc --watch & mocha --watch & wait"
}
```

## Run your tests

```
npm run tdd
```

None of the tests will pass yet. You'll start fixing that in the next step!
