# Kapeta Readme
This file contains some structural information about this service.

This file will be overwritten every time you change the service definition in Kapeta.

## Folder Structure
This service is structured as follows:

### Generated files
All files in the following folders are generated by Kapeta - and should not be edited manually.
* ```src/.generated/config```: Contains your configuration entities
* ```src/.generated/data```: Contains anything related to databases
* ```src/.generated/entities```: Contains the public entities used by the service.
* ```src/.generated/client```: Contains REST Clients.
* ```src/.generated/rest```: Contains REST API routes.

### Editable files
All other files are editable - and will not be overwritten by Kapeta unless explictly mentioned in the file.

* ```src/service```: Contains the service layer logic. This is where you should add your business logic

### Path alias for generated files

To import generated files you can use the following path alias:
```typescript
import { MyEntity } from 'generated:entities/MyEntity';
```

## REST API 
To edit the REST API handlers edit the services found here:
* [src/service/TasksRouteService.tsx](src/service/TasksRouteService.tsx)

These are generated as TSX files to make it simple to render emails using JSX syntax.

The service files will only be generated if they don't already exist - or if they have not
changed since the last time they were generated.

### Errors
To throw an error with a specific HTTP status code from a REST API handler - use the following code:
```ts
import { RESTError } from '@kapeta/sdk-rest-route';
throw new RESTError('User not found', 404);
```
or simply:
```ts
someHandler(req:Request, res:Response) {
    res.sendError('User not found', 404);
}
```

Any exceptions thrown that are not RESTError will be converted to a 500 error.

All errors will be formatted as JSON - with the following structure:
```json
{
    "error": "My error message"
}
```


## REST Clients
You'll find the REST clients in the following folder: ```src/.generated/client```

See below for details on how to use the REST clients.

### users
To use the "users" REST Client - simply add the following code to your service:

```typescript
import { UsersClient } from 'generated:client/UsersClient';


class MyService {
    private client: UsersClient;
    
    constructor() {
        this.client = new UsersClient();
    }
}
```

## MongoDB: todo
To use the "todo" MongoDB database - simply add the following code to your service:

```typescript
import { TodoDB } from 'generated:data/TodoDB';

class MyService {
    private db: TodoDB;
    
    constructor() {
        /**
         * Note: The database is not ready initially. It will be loaded during startup.
         * It is guaranteed to be ready before the first request is handled.
         * This means that the this.db.client property will not be ready during startup.
         */
        this.db = new TodoDB();
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
    async getTodo() {
        return await this.client.todo.findMany({});
    }
}
```
### Schema changes
This service uses Prisma to manage the database schema.

A prisma schema looks something like this:
```prisma
model Todo {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name      String?
  createdAt DateTime
  updatedAt DateTime

  @@map("todo")
}
```

To edit the **todo** database schema edit the Prisma schema files here:
- [db/todo/schema.prisma](db/todo/schema.prisma)

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

## RabbitMQ Subscriber
To consume messages from a RabbitMQ queue a consumer is generated for you for each resource.

Use the constructor function to create a new consumer.

Below is an example of how to use the consumer to listen for messages on the queue:
```javascript
import { ConfigProvider, runApp } from '@kapeta/sdk-config';
import { createServer } from './src/server';
import { createRoutes } from 'generated:routes';
import { addEventsSubscriber } from 'generated:queues/events-subscriber';
import { TypedAsyncMessage } from '@kapeta/sdk-rabbitmq';
import { Event } from 'generated:entities/Logs';

// runApp is a helper function that will load the configuration from Kapeta and then run the provided function
runApp(async (configProvider: ConfigProvider) => {
    // Create the server - see src/server/server.ts for more information
    const server = createServer(configProvider);

    // Add a subscriber to the events queue
    await addEventsSubscriber(configProvider, (event:Event, msg:TypedAsyncMessage<Event>) => {
        console.log('Received events', events, msg);
    })

    // Includes the generated routes for your API resources
    server.use(await createRoutes(configProvider));

    server.start('rest');
}, __dirname);

```