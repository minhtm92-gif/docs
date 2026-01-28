import { Module } from '@nestjs/common';
import { SellpagesController } from './sellpages.controller';
import { SellpagesService } from './sellpages.service';

@Module({
  controllers: [SellpagesController],
  providers: [SellpagesService],
})
export class SellpagesModule {}
