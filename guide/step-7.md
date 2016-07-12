# Step 7 - Write the Lambda function part 2 - upndown

You'll be using the [upndown](https://github.com/netgusto/upndown) library to
convert the simplified HTML from readability into markdown.

## Install upndown

As with node-readability, perform an npm install in the `urlToMd` directory.

```
npm install --save upndown
```

## Generate markdown

### Create type definitions

As with node-readability, upndown does not have type definitions available.
Start by creating them in `upndown.d.ts` ([GitHub link](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-7/functions/urlToMd/upndown.d.ts)).

```typescript
declare module "upndown" {
  class upndown{
    convert(source: string, callback: (err: Error, markdown: string) => any): void;
  }
  namespace upndown {}
  export = upndown
}
```

Add a reference to the type definitions below the readability reference.

```typescript
/// <reference path="readability.d.ts"/>
```

### Create the function

Start by importing the upndown module.

```typescript
import * as upndown from 'upndown'
```

Next, create a new instance of upndown.

```typescript
const und = new upndown()
```

Then create a function to convert the readable html to markdown.

```typescript
const toMarkdown = (source: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    und.convert(source, (err: Error, mkd: string) => {
      if (err) {
        return reject(err)
      }
      resolve(mkd)
    })
  }
)}
```

### Update the handler
Finally, update the handler to incorporate the markdown conversion and return
it.

```typescript
export const handler = async (event: MarkdownEvent, context: Object, cb: Function) => {
  console.info('event received...', JSON.stringify(event))

  console.info('making url readable...')
  let article: readability.ReadableArticle, mkd: string
  try {
    article = await makeReadable(event.url)
  } catch (e) {
    return cb(e)
  }

  console.info('converting to markdown...')
  try {
    mkd = await toMarkdown(article.content)
  } catch (e) {
    return cb(e)
  }

  cb(null, {
    title: article.title,
    content: mkd
  })

  // Clean up readable article
  article.close()
}
```

[See the finished handler.ts file on GitHub](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-7/functions/urlToMd/handler.ts).

## Test your code

An `npm test` should provide you with 2 passing tests!

## Run the Lambda locally

Run `serverless function run` (from within the `urlToMd` directory) to see the
new JSON response.

## Deploy it

As the endpoint configuration has not changed, you can simply redeploy the
function. Run `serverless function deploy`.

Once the function has deployed, refresh the endpoint to see the new JSON
response.
