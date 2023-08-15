# Ever API Starter Kit / Boilerplate

## 🌟 What is it

[Ever® API Starter Kit™](https://ever.dev) - Open-Source Starter Kit / Boilerplate for Multi-Tenant APIs

## 🧱 Technology Stack

-   NestJs / CQRS
-   GraphQL & REST APIs
-   TypeORM
-   PostgreSQL / SQLite / sqljs
-   Docker / Kubernetes
-   [Supertokens Auth](https://github.com/supertokens/supertokens-core)

## 🚀 Quick Start

### Start locally

0. Clone repo

1. Install packages

```
$ yarn install
```

2. Create local PostgreSQL DB called `ever_api_starter_kit`

3. Run following command:

```
$ yarn start
```

Then browse http://localhost:3005

Note: GraphQL Playground available at <http://localhost:3005/graphql>

#### Use serverless-offline

Note: at this moment may not work, WIP.

```bash
$ yarn build
$ yarn sls:start
```

Then browse http://localhost:3005/local

Note: GraphQL Playground available at http://localhost:3005/local/graphql

## How to Deploy

NOTE: WIP, not working well yet with serverless!

```bash
$ yarn prestart:prod && sls deploy
```

## Development

### Use Swagger for development

```
$ yarn ts-node src/swagger.ts
```

Then browse http://localhost:3006/api

### Client GraphQL SDK Generation

To generate GraphQL Client SDK (using [graphql-code-generator](https://github.com/dotansimha/graphql-code-generator)), please run following command:

```
$ yarn generate
```

Generated SDK available at `./generated/sdk` folder and generated Schemas available at `./generated/schemas` folder.

### 🔗 Credits

-   See [CREDITS.md](CREDITS.md) file for lists of libraries and software used and/or included in the Starter Kit, information about licenses, and other relevant details.

## 💌 Contact Us

-   [Ever.co Website Contact Us page](https://ever.co/contacts)
-   For business inquiries: <mailto:ever@ever.co>
-   Please report security vulnerabilities to <mailto:security@ever.co>

## 🔐 Security

Ever® API Starter Kit™ follows good security practices, but 100% security cannot be guaranteed in any software!
Ever® API Starter Kit™ is provided AS IS without any warranty. Use at your own risk!
See more details in the [LICENSE](LICENSE).

In a production setup, all client-side to server-side (backend, APIs) communications should be encrypted using HTTPS/WSS/SSL (REST APIs, GraphQL endpoint, Socket.io WebSockets, etc.).

If you discover any issue regarding security, please disclose the information responsibly by sending an email to <mailto:security@ever.co> or on [![huntr](https://cdn.huntr.dev/huntr_security_badge_mono.svg)](https://huntr.dev) and not by creating a GitHub issue.

## 🛡️ License

[MIT](LICENSE)

## ™️ Trademarks

**Ever**® is a registered trademark of [Ever Co. LTD](https://ever.co).
**Ever® API Starter Kit™**, **Ever® Demand™**, **Ever® Teams™**, **Ever® Gauzy™**, **Ever® Gauzy AI™**, **Ever® OpenSaaS™** are all trademarks of [Ever Co. LTD](https://ever.co).

The trademarks may only be used with the written permission of Ever Co. LTD. and may not be used to promote or otherwise market competitive products or services.

All other brand and product names are trademarks, registered trademarks or service marks of their respective holders.

## ©️ Copyright

#### Copyright © 2020-present, Ever Co. LTD. All rights reserved
