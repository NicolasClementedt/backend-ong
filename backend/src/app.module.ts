import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ItemModule } from './item/item.module';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [PrismaModule, ItemModule, TransactionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
