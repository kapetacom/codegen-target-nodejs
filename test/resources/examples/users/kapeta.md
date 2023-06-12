# Kapeta Readme
This file contains some structural information about this service.

This file will be overwritten every time you change the service definition in Kapeta.

## Structure
This service is structured as follows:
* src/data: Contains anything related to databases
* src/entities: Contains the entities used by the service. 
  * These are generated files and should not be edited directly
* src/rest: Contains the REST API routes. 
  * These are generated files and should not be edited directly
* src/service: Contains the service layer logic. This is where you should add your business logic

## REST API 
To edit the REST API handlers edit the services found here:
* [src/service/UsersRouteService.tsx](src/service/UsersRouteService.tsx)

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
## Postgres: users
To use the "users" Postgres database - simply add the following code to your service:

```typescript
import { UsersDB } from '../data/UsersDB';

class MyService {
    private db: UsersDB;
    
    constructor() {
        /**
         * Note: The database is not ready initially. It will be loaded during startup.
         * It is guaranteed to be ready before the first request is handled.
         * This means that the this.db.client property will not be ready during startup.
         */
        this.db = new UsersDB();
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
    async getUsers() {
        return await this.client.users.findMany({});
    }
}
```
### Schema changes
This service uses Prisma to manage the database schema.

A prisma schema looks something like this: 
```prisma
model Users {
  id        String   @id @default(uuid())
  name      String?  @db.VarChar(255)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

To edit the **users** database schema edit the Prisma schema files here:
- [db/users/schema.prisma](db/users/schema.prisma)

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

