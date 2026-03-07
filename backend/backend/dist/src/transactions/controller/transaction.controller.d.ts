import { TransactionService } from '../service/transaction.service';
import { FilterTransactionDto } from '../dto/filter-transaction.dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(dto: CreateTransactionDto): Promise<{
        item: {
            nome: string;
            categoria: import("@prisma/client").$Enums.Categoria;
            unidadeMedida: string;
            quantidadeMinima: number;
            id: string;
            quantidadeAtual: number;
            criadoEm: Date;
            atualizadoEm: Date;
        };
    } & {
        data: Date;
        id: string;
        criadoEm: Date;
        itemId: string;
        tipo: import("@prisma/client").$Enums.TipoTransacao;
        quantidade: number;
        observacao: string | null;
        categoriaDestino: import("@prisma/client").$Enums.CategoriaDestino | null;
        descricaoDestino: string | null;
        usuarioId: string | null;
    }>;
    findAll(filters: FilterTransactionDto): Promise<({
        item: {
            nome: string;
            categoria: import("@prisma/client").$Enums.Categoria;
            unidadeMedida: string;
            quantidadeMinima: number;
            id: string;
            quantidadeAtual: number;
            criadoEm: Date;
            atualizadoEm: Date;
        };
    } & {
        data: Date;
        id: string;
        criadoEm: Date;
        itemId: string;
        tipo: import("@prisma/client").$Enums.TipoTransacao;
        quantidade: number;
        observacao: string | null;
        categoriaDestino: import("@prisma/client").$Enums.CategoriaDestino | null;
        descricaoDestino: string | null;
        usuarioId: string | null;
    })[]>;
}
