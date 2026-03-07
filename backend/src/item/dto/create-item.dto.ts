import { Categoria } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  nome!: string;

  @IsEnum(Categoria)
  categoria!: Categoria;

  @IsString()
  unidadeMedida!: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  quantidadeMinima!: number;
}
