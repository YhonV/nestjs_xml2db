import { Injectable, Logger, Inject } from '@nestjs/common';
import { PG_CONNECTION } from '../config/constants';

@Injectable()
export class DatabaseService{
    logger = new Logger();
    constructor(@Inject(PG_CONNECTION) private conn:any){
        this.logger.log('Connected to the database');
    }

    async getXml() {
        try{
            this.logger.log('Iniciando la query...');
            const res = await this.conn.query('SELECT * FROM XML_FILES');
            return res.rows;
        }catch(err){
            this.logger.error(err);
            return err;
        }
    }
}