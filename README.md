# serverless-microservice-guide
Step by step guide to building a serverless service with node.js.

* [Prerequesites](#prerequesites)
* [Repo Structure](#repo-structure)

## Prerequesites

### AWS Account
This project uses Amazon Web Services (AWS) to host the service. You can build
and test the code without an account, but it's much more fun to deploy it!
If you don't qualify for the AWS free tier, this project will cost no more than
a few pennies. You will use the Lambda and API Gateway services.

### Node.JS
You'll need [Node.JS](https://nodejs.org/en/) installed for this project. At the
time of writing, [AWS Lambda uses version 4.3.2 of Node
](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html),
so I recommend you use the same. I use [nvm](https://github.com/creationix/nvm)
to manage Node versions - there are alternatives listed for Windows users in the
[nvm README](https://github.com/creationix/nvm/blob/master/README.markdown).

### Typescript support (optional)
This project uses [Typescript](https://www.typescriptlang.org/) (a typed
superset of JavaScript.) An editor with Typescript support is helpful when
coding with Typescript. Some options include:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Atom](https://atom.io/) with the [atom-typescript](https://atom.io/packages/atom-typescript) package.
* [Sublime Text](https://www.sublimetext.com/) with the [Typescript Plugin](https://github.com/Microsoft/TypeScript-Sublime-Plugin)
* [Some others](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support)
from Microsoft.

## Repo Structure
To follow this guide, simply clone this repo and follow the tutorial steps.
If you get stuck at ay point, there is a branch that represents the project at
the end of each step. For example, the Step 1 branch represents what your
project should look like (minus gitignored files) at the end of Step 1.
