import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('xml')
export class XmlController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getXml() {
        return this.appService.getXml();
    }

    @Post()
    async insertXmlFile(){
        const filePath = 'C:\\Users\\carlo\\OneDrive\\Escritorio\\PRO-CI-GCLFAESF072200320503AI.xml';
        const insertedRow = await this.appService.insertXml(filePath);
        return insertedRow;
    }
}