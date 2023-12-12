//
// GENERATED SOURCE - DO NOT EDIT
//
import { PostgresDB } from '@kapeta/sdk-sqldb-postgresql';
import { Prisma, PrismaClient } from './clients/users';

export class UsersDB extends PostgresDB<PrismaClient> {
    constructor() {
        super('users');
    }

    createClient(opts: Prisma.PrismaClientOptions): PrismaClient {
        return new PrismaClient(opts);
    }
}
