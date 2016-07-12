# Step 5 - Configure API Gateway endpoint

Before writing the handler, you need to configure API Gateway to pass the `url`
querystring parameter to the lambda function.

## Modify the Request template

First, modify the `s-function.json` file in the `urlToMd` directory so that it
will pass on the url parameter from the endpoint querystring.

In the `endpoints` array, edit `requestTemplates` to look like this:

```json
"requestTemplates": {
  "application/json": {
    "url" : "$input.params().querystring.url"
  }
}
```

[See the edited file on GitHub.](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-5/functions/urlToMd/s-function.json)

## Retrieve the url parameter

Next, edit `handler.ts` to return the url parameter that API Gateway passed to
it. Delete the scaffolded code that Serverless created and replace it with

```typescript
export interface MarkdownEvent {
  url: string
}

export const handler = (event: MarkdownEvent, context: Object, cb: Function) => {
  return cb(null, {
    url: event.url
  });
};
```

Now that you're using TypeScript, you need to define the object structure you
expect to receive from Lambda - in the case a single url parameter that is a
string. Additionally, the function now uses ES2015 arrow function syntax.

[See the edited file on Github.](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-5/functions/urlToMd/handler.ts)

## Test the function

To test the function locally, edit the `event.json` ([GitHub link](https://github.com/benjaminkitt/serverless-microservice-guide/blob/step-5/functions/urlToMd/event.json)) file to create a mock Lambda event.

```json
{
  "url": "http://www.bbc.com/culture/story/20160704-mount-rushmore-at-75-how-did-it-come-to-be"
}
```

Next, run `tsc` to compile your Typescript then, from *within the urlToMd directory*, run `serverless function run`.

You should receive the following output:

```
Serverless: Success! - This Response Was Returned:
Serverless: {
    "url": "http://www.bbc.com/culture/story/20160704-mount-rushmore-at-75-how-did-it-come-to-be"
}
```

## Deploy the revised endpoint and function

```
serverless dash Deploy
```

As in Step 2, select both the endpoint and function, then select deploy. Once
deployed, navigate to the API endpoint but this time, append a url parameter,
i.e.

```
https://abcdefg12.execute-api.us-east-1.amazonaws.com/dev/urlToMd?url=http://www.bbc.com/culture/story/20160704-mount-rushmore-at-75-how-did-it-come-to-be
```

You should receive a JSON response with the URL echoed back to you!
