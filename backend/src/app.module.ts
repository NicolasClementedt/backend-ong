import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ItemModule } from './item/item.module';
import { TransactionModule } from './transactions/transaction.module';
import { DashboardModule } from '../dashboard/dashboard.module';

@Module({
  imports: [PrismaModule, ItemModule, TransactionModule, DashboardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
