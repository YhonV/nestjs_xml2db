import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_CONNECTION } from './config/constants';
import { readFileSync } from 'fs';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class AppService{
    logger = new Logger();
    constructor(@Inject(PG_CONNECTION) private conn:any){
      this.logger.log('Connected to the database');
    }

    async getXml() {
      try{
        this.logger.log('Iniciando la query...');
        const res = await this.conn.query('SELECT * FROM "XML_FILES"');
        return res.rows;
        this.logger.log('Query finalizada');
      }catch(err){
          this.logger.error(err);
          return err;
      }
  }

  async insertXml(filePath: string){
    try{
      this.logger.log('Iniciando la inserción...');
      const xmlContent = readFileSync(filePath, 'utf-8')
      const jsonObj = await parseStringPromise(xmlContent);
      const documentNo = jsonObj.BusinessDocument.DocumentHeader[0].DocumentReference[0].DocumentNo[0]; // Extrae el valor de DocumentNo
      const query = `INSERT INTO "XML_FILES" (document_name, xml_content, created_at) VALUES ($1, $2, NOW()) RETURNING *`;
      const values = [documentNo,xmlContent];
      const res = await this.conn.query(query, values);
      this.logger.log('Inserción finalizada');
      return res.rows[0]; // Retorna la fila insertada
    }catch(err){
      this.logger.error(err);
      return err;
    }
  }
}
