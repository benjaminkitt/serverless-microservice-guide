# Step 1 - Serverless Setup

## Install the Serverless Framework

Start by installing the Serverless framework:

```
npm install -g serverless
```

## Set up an IAM role

Next, set up an AWS IAM role for Serverless to use. You can find instructions
for this (and relevant warnings) in the [Serverless documentation](http://docs.serverless.com/docs/configuring-aws#section-creating-an-administrative-iam-user). However, the basic steps are:

* Create or login to your Amazon Web Services Account and go the the Identity & Access Management (IAM) Page.
* Click on Users and then Create New Users. Enter serverless-admin in the first field and click Create.
* View and copy the security credentials/API Keys in a safe place.
* In the User record in the AWS IAM Dashboard, look for Managed Policies on the Permissions tab and click Attach Policy. In the next screen, search for and select AdministratorAccess then click Attach.

## Set up an AWS profile

* Edit or create your AWS credentials file (`~/.aws/credentials` on Mac/Linux or
`%UserProfile%\.aws\credentials` on Windows.)
* Add the following, substituting the keys you generated in IAM:
```
[serverless]
aws_access_key_id=your_serverless_access_key
aws_secret_access_key=your_serverless_secret_access_key
```

## Create a Serverless project
Change to the parent directory and create the serverless project (creating a project in an existing directory will be available with Serverless 1.0.)

> Note: If you don't have an AWS account to deploy to, add the `-c` option to
> the command. This will stop serverless from executing the CloudFormation file.

```
cd ..
serverless project create -n serverless-microservice-guide -p serverless -r us-east-1 -s dev
cd serverless-microservice-guide
```

In the above command:

* **-n serverless-microservice-guide** - The name of the directory/project to create
* **-p serverless** - The name of the AWS profile you created
* **-r us-east-1** - The AWS region to deploy to
* **-s dev** - The stage/environment to deploy to

Serverless will deploy resources. You now have a brand new Serverless project.
