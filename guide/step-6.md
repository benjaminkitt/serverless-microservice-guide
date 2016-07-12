# Write the Lambda function part 1 - node-readability

You'll use the [node-readability](https://github.com/luin/readability) library
to fetch the html at the URL and simplify it before converting it to markdown.

## Install node-readability

In order to use npm modules with your Lambda function, they must be installed
into the same directory as the Lambda function. The easiest way to do so is to
create an empty `package.json` and execute npm install from within the `urlToMd`
directory.

```
echo "{}" > package.json
npm install --save node-readability
```

## Generate readable HTML

Now that node-readability is installed, start by importing it into handler.ts.

```typescript
import * as readability from 'node-readability'
```

### Create type definitions

If you have Typescript linting enabled, you'll notice Typescript cannot find the
module. This is because you have not installed type definitions and, at the time
of writing, node-readability does not have any available. To create your own
typings, create a `readability.d.ts` file in the `urlToMd` directory and include
the following definitions.

```typescript
declare module "node-readability" {
  function readability(url: string, callback: (err: Error, article: readability.ReadableArticle) => any): void;
  namespace readability {
    export interface ReadableArticle {
      title: string,
      content: string,
      close: Function
    }
  }
  export = readability
}
```

To make use of the definitions in `handler.ts`, include the following reference
on the first line of the file.

```typescript
/// <reference path="readability.d.ts"/>
```

### Write the function

Next, write a function to process the incoming url.

```typescript
const makeReadable = (url: string): Promise<readability.ReadableArticle> =>
  new Promise((resolve: Function, reject: Function) => {
    readability(url, (err: Error, article: readability.ReadableArticle) => {
      if (err) {
        return reject(err)
      }
      resolve(article)
    })
  })
```

### Update the handler

Finally, update the handler function to pass the url to `makeReadable`.

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

  cb(null)

  // Clean up readable article
  article.close()
}
```

## Test your code

If you still have your `tdd` script running, you should now find the first test passing! Otherwise, run `npm test` for the same result.
