#FILENAME:kapeta.md:write-always
# Kapeta Readme
This file contains some structural information about this service.

This file will be overwritten every time you change the service definition in Kapeta.

## Structure
This service is structured as follows:
* src/data: Contains anything related to databases
* src/entities: Contains the entities used by the service. 
  * These are generated files and should not be edited directly
{{#provides 'kapeta/resource-type-rest-api'}}
* src/rest: Contains the REST API routes. 
  * These are generated files and should not be edited directly
{{/provides}} 
* src/service: Contains the service layer logic. This is where you should add your business logic

{{#provides 'kapeta/resource-type-rest-api'}}
## REST API 
To edit the REST API handlers edit the services found here:
{{#providers-of-type 'kapeta/resource-type-rest-api'}}
* [src/service/{{type metadata.name}}RouteService.tsx](src/service/{{type metadata.name}}RouteService.tsx)
{{/providers-of-type}}

The transport layer is abstracted away - so your service
will be called as specified within the REST API definition in Kapeta.

You just need to worry about the logic.

These are generated as TSX files to make it simple to render emails using JSX syntax.

The service files will only be generated if they don't already exist - or if they have not
changed since the last time they were generated.

### Errors
To throw an error with a specific HTTP status code from a REST API handler - use the following code:
```ts
import { RESTError } from '@kapeta/sdk-rest-route';
throw new RESTError('User not found', 404);
```
Any exceptions thrown that are not RESTError will be converted to a 500 error.
{{/provides}}
{{#consumers-of-type 'kapeta/resource-type-postgresql'}}
## Postgres: {{metadata.name}}
To use the "{{metadata.name}}" Postgres database - simply add the following code to your service:

```typescript
import { {{type metadata.name}}DB } from '../data/{{type metadata.name}}DB';

class MyService {
    private db: {{type metadata.name}}DB;
    
    constructor() {
        /**
         * Note: The database is not ready initially. It will be loaded during startup.
         * It is guaranteed to be ready before the first request is handled.
         * This means that the this.db.client property will not be ready during startup.
         */
        this.db = new {{type metadata.name}}DB();
    }

    /**
     * The database client. 
     * A simple helper to make it a little shorter to access the database.
     */
    private get client() {
        return this.db.client;
    }

    /**
     * Example of how to use the database client.
     */
    async get{{type metadata.name}}() {
        return await this.client.{{metadata.name}}.findMany({});
    }
}
```
### Schema changes
This service uses Prisma to manage the database schema.

A prisma schema looks something like this: 
```prisma
model {{type metadata.name}} {
  id        String   @id @default(uuid())
  name      String?  @db.VarChar(255)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("{{metadata.name}}")
}
```

To edit the **{{metadata.name}}** database schema edit the Prisma schema files here:
- [db/{{metadata.name}}/schema.prisma](db/{{metadata.name}}/schema.prisma)

Read more about Prisma here:
https://pris.ly/d/prisma-schema

When you are done editing the schema, 
run the following command to generate a new database migration file:
```bash
npm run migrate:dev
```

Run the following command to apply the migration to your database:
```bash
npm run migrate
```
{{/consumers-of-type}}

{{#consumers-of-type 'kapeta/resource-type-mongodb'}}
## MongoDB: {{metadata.name}}
To use the "{{metadata.name}}" MongoDB database - simply add the following code to your service:

```typescript
import { {{type metadata.name}}DB } from '../data/{{type metadata.name}}DB';

class MyService {
    private db: {{type metadata.name}}DB;
    
    constructor() {
        /**
         * Note: The database is not ready initially. It will be loaded during startup.
         * It is guaranteed to be ready before the first request is handled.
         * This means that the this.db.client property will not be ready during startup.
         */
        this.db = new {{type metadata.name}}DB();
    }

    /**
     * The database client. 
     * A simple helper to make it a little shorter to access the database.
     */
    private get client() {
        return this.db.client;
    }

    /**
     * Example of how to use the database client.
     */
    async get{{type metadata.name}}() {
        return await this.client.{{metadata.name}}.findMany({});
    }
}
```
### Schema changes
This service uses Prisma to manage the database schema.

A prisma schema looks something like this:
```prisma
model {{type metadata.name}} {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name      String?
  createdAt DateTime
  updatedAt DateTime

  @@map("{{metadata.name}}")
}
```

To edit the **{{metadata.name}}** database schema edit the Prisma schema files here:
- [db/{{metadata.name}}/schema.prisma](db/{{metadata.name}}/schema.prisma)

Read more about Prisma here:
https://pris.ly/d/prisma-schema

When you are done editing the schema,
run the following command to generate a new database migration file:
```bash
npm run migrate:dev
```

Run the following command to apply the migration to your database:
```bash
npm run migrate
```
{{/consumers-of-type}}

{{#consumes 'kapeta/resource-type-smtp-client'}}
## Emails

To send simple emails - use the following code:
```tsx
import { EmailClient } from '@kapeta/sdk-smtp-client';
const emailClient = new EmailClient();
await emailClient.send({
    from: 'support@kapeta.com',
    to: 'someone@somewhere.com',
    subject: 'Hi!',
    text: 'Hello World!',
    html: '<h1>Hello World!</h1>',
});
```
E-mails are send using nodemailer. Read more here:
https://nodemailer.com/about/

To send emails rendered using React - use the following code: 
```tsx
import { EmailClient } from '@kapeta/sdk-smtp-client';
const emailClient = new EmailClient();
await emailClient.sendReact({
    from: 'support@kapeta.com',
    to: 'someone@somewhere.com',
    subject: 'Hi!',
    body: <MyEmail />,
});
```
This uses react-email - read more here: https://react.email/

### Email templates
Email templates are simply React components which are rendered using [react-email](https://react.email/).

### Testing
When sending e-mails locally it will use gosmtpd - which doesn't actually send any e-mails. 
It has a web interface and API where you can see the e-mails that would have been sent.
Read more here:
https://gitlab.com/sorenmat/gosmtpd

{{/consumes}}

