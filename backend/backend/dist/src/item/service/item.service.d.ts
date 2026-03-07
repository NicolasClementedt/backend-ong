import { PrismaService } from '../../prisma/prisma.service';
import { NivelAlerta } from '../../common/enums/enums';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
export declare class ItemService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private calcularAlerta;
    private toResponse;
    create(dto: CreateItemDto): Promise<{
        id: any;
        nome: any;
        categoria: any;
        unidadeMedida: any;
        quantidadeMinima: any;
        quantidadeAtual: any;
        nivelAlerta: NivelAlerta;
    }>;
    findAll(categoria?: string): Promise<unknown[]>;
    findOne(id: string): Promise<{
        id: any;
        nome: any;
        categoria: any;
        unidadeMedida: any;
        quantidadeMinima: any;
        quantidadeAtual: any;
        nivelAlerta: NivelAlerta;
    }>;
    update(id: string, dto: UpdateItemDto): Promise<{
        id: any;
        nome: any;
        categoria: any;
        unidadeMedida: any;
        quantidadeMinima: any;
        quantidadeAtual: any;
        nivelAlerta: NivelAlerta;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
