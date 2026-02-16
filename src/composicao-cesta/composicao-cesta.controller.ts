import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComposicaoCestaService } from './composicao-cesta.service';
import { CreateComposicaoCestaDto } from './dto/create-composicao-cesta.dto';
import { UpdateComposicaoCestaDto } from './dto/update-composicao-cesta.dto';

@Controller('composicao-cesta')
export class ComposicaoCestaController {
  constructor(private readonly composicaoCestaService: ComposicaoCestaService) {}

  @Post()
  create(@Body() createComposicaoCestaDto: CreateComposicaoCestaDto) {
    return this.composicaoCestaService.create(createComposicaoCestaDto);
  }

  @Get()
  findAll() {
    return this.composicaoCestaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.composicaoCestaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComposicaoCestaDto: UpdateComposicaoCestaDto) {
    return this.composicaoCestaService.update(+id, updateComposicaoCestaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.composicaoCestaService.remove(+id);
  }
}
