import { CategoriaDestino, TipoTransacao } from '@prisma/client';
export declare class CreateTransactionDto {
    itemId: string;
    tipo: TipoTransacao;
    quantidade: number;
    observacao?: string;
    categoriaDestino?: CategoriaDestino;
    descricaoDestino?: string;
    data?: string;
}
