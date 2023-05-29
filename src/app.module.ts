import { Module } from '@nestjs/common';
import { NextModule } from 'ng/next';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    NextModule.forRoot({
      dev: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
