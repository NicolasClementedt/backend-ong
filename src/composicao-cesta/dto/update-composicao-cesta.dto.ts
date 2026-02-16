import { PartialType } from '@nestjs/mapped-types';
import { CreateComposicaoCestaDto } from './create-composicao-cesta.dto';

export class UpdateComposicaoCestaDto extends PartialType(CreateComposicaoCestaDto) {}
