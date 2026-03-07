import { Categoria } from '@prisma/client';
export declare class CreateItemDto {
    nome: string;
    categoria: Categoria;
    unidadeMedida: string;
    quantidadeMinima: number;
}
