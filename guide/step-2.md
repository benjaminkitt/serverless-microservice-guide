# Step 2 - Creating the Function

You're going to create a function called urlToMd that will eventually take a URL
and convert it to Markdown.

## Scaffold the Function

First, make sure you're inside the serverless-microservice-guide directory.
Then, use the following command to scaffold the Function.

```
serverless function create functions/urlToMd
```

The command will walk you through a series of steps to scaffold the function.

1. Select `nodejs4.3` as the runtime
1. Select `Create Endpoint` to create an API Gateway endpoint for your function.

There should now be a functions directory containing a urlToMd folder!

## Deploy the function

Next, deploy the function and endpoint to AWS.

```
serverless dash deploy
```

Use the spacebar to select the new function and endpoint, then select deploy to
deploy them both to AWS.

Once deployed, the last line of the log will show you the URL at which to access
the new API. Try loading it now. All being well, you should receive:

```json
{"message":"Go Serverless! Your Lambda function executed successfully!"}
```
