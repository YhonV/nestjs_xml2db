import { Module } from '@nestjs/common'; 
import { XmlController } from './app.controller'; 
import { AppService } from './app.service'; 
import { DbModule } from './db/db.module';

@Module({ 
  imports: [DbModule], 
  controllers: [XmlController], 
  providers: [AppService],
}) 
  
export class AppModule {}