import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { FilterTransactionDto } from '../dto/filter-transaction.dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() dto: CreateTransactionDto) {
    return this.transactionService.create(dto);
  }

  @Get()
  findAll(@Query() filters: FilterTransactionDto) {
    return this.transactionService.findAll(filters);
  }
}
