import { CategoriaDestino, TipoTransacao } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  itemId!: string;

  @IsEnum(TipoTransacao)
  tipo!: TipoTransacao;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantidade!: number;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsEnum(CategoriaDestino)
  categoriaDestino?: CategoriaDestino;

  @IsOptional()
  @IsString()
  descricaoDestino?: string;

  @IsOptional()
  @IsDateString()
  data?: string;
}
