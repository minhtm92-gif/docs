import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { SellpagesModule } from './sellpages/sellpages.module';

@Module({
  imports: [PrismaModule, ProductsModule, SellpagesModule],
})
export class AppModule {}
