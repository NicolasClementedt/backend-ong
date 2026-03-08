import { TransactionService } from '../service/transaction.service';
import { FilterTransactionDto } from '../dto/filter-transaction.dto';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(dto: CreateTransactionDto): Promise<{
        item: {
            id: string;
            nome: string;
            categoria: import("@prisma/client").$Enums.Categoria;
            unidadeMedida: string;
            quantidadeAtual: number;
            quantidadeMinima: number;
            criadoEm: Date;
            atualizadoEm: Date;
        };
    } & {
        id: string;
        criadoEm: Date;
        tipo: import("@prisma/client").$Enums.TipoTransacao;
        quantidade: number;
        observacao: string | null;
        categoriaDestino: import("@prisma/client").$Enums.CategoriaDestino | null;
        descricaoDestino: string | null;
        data: Date;
        itemId: string;
        usuarioId: string | null;
    }>;
    findAll(filters: FilterTransactionDto): Promise<({
        item: {
            id: string;
            nome: string;
            categoria: import("@prisma/client").$Enums.Categoria;
            unidadeMedida: string;
            quantidadeAtual: number;
            quantidadeMinima: number;
            criadoEm: Date;
            atualizadoEm: Date;
        };
    } & {
        id: string;
        criadoEm: Date;
        tipo: import("@prisma/client").$Enums.TipoTransacao;
        quantidade: number;
        observacao: string | null;
        categoriaDestino: import("@prisma/client").$Enums.CategoriaDestino | null;
        descricaoDestino: string | null;
        data: Date;
        itemId: string;
        usuarioId: string | null;
    })[]>;
}
