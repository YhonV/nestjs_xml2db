import { Module } from '@nestjs/common';
import { PG_CONNECTION } from 'src/config/constants';
import { Pool } from 'pg';

const db = {
    provide: PG_CONNECTION,
    useValue: new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'password',
        port: 5432,
    }),
}


@Module({
    providers: [db],
    exports: [db],
})
export class DbModule {}
