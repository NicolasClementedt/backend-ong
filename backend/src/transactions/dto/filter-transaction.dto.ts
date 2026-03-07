import { TipoTransacao } from '.prisma/client';
import {
  IsDateString,
  isDateString,
  IsEnum,
  IsOptional,
  IsString,
  isString,
} from 'class-validator';

export class FilterTransactionDto {
  @IsOptional()
  @IsString()
  itemId?: string;

  @IsOptional()
  @IsEnum(TipoTransacao)
  tipo?: TipoTransacao;

  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string;
}
