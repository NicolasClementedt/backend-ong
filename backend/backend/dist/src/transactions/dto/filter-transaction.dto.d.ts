import { TipoTransacao } from '.prisma/client';
export declare class FilterTransactionDto {
    itemId?: string;
    tipo?: TipoTransacao;
    dataInicio?: string;
    dataFim?: string;
}
