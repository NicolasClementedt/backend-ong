import { Injectable } from '@nestjs/common';
import { CreateComposicaoCestaDto } from './dto/create-composicao-cesta.dto';
import { UpdateComposicaoCestaDto } from './dto/update-composicao-cesta.dto';

@Injectable()
export class ComposicaoCestaService {
  create(createComposicaoCestaDto: CreateComposicaoCestaDto) {
    return 'This action adds a new composicaoCesta';
  }

  findAll() {
    return `This action returns all composicaoCesta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} composicaoCesta`;
  }

  update(id: number, updateComposicaoCestaDto: UpdateComposicaoCestaDto) {
    return `This action updates a #${id} composicaoCesta`;
  }

  remove(id: number) {
    return `This action removes a #${id} composicaoCesta`;
  }
}
