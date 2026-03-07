import { ItemService } from '../service/item.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(dto: CreateItemDto): Promise<{
        id: any;
        nome: any;
        categoria: any;
        unidadeMedida: any;
        quantidadeMinima: any;
        quantidadeAtual: any;
        nivelAlerta: import("../../common/enums/enums").NivelAlerta;
    }>;
    findAll(categoria?: string): Promise<unknown[]>;
    findOne(id: string): Promise<{
        id: any;
        nome: any;
        categoria: any;
        unidadeMedida: any;
        quantidadeMinima: any;
        quantidadeAtual: any;
        nivelAlerta: import("../../common/enums/enums").NivelAlerta;
    }>;
    update(id: string, dto: UpdateItemDto): Promise<{
        id: any;
        nome: any;
        categoria: any;
        unidadeMedida: any;
        quantidadeMinima: any;
        quantidadeAtual: any;
        nivelAlerta: import("../../common/enums/enums").NivelAlerta;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
