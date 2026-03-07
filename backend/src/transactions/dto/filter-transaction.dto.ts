import { TipoTransacao } from '@prisma/client';
import { IsEnum, IsOptional, IsString, isString } from 'class-validator';

export class FilterTransactionDto {
  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsEnum(TipoTransacao)
  tipo?: TipoTransacao;
}
