//
// GENERATED SOURCE - DO NOT EDIT
//

import { MongoDB } from "@kapeta/sdk-nosql-mongodb";
import { Prisma, PrismaClient } from "./clients/todo";

export class TodoDB extends MongoDB<PrismaClient> {
    constructor() {
        super("todo");
    }

    createClient(opts: Prisma.PrismaClientOptions): PrismaClient {
        return new PrismaClient(opts);
    }
}
