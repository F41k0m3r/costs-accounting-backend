import { Model } from 'mongoose';
import { Cost, CostsDocument } from './costs.schema';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
export declare class CostsService {
    private costsModel;
    constructor(costsModel: Model<CostsDocument>);
    findAll(): Promise<Cost[]>;
    findOne(id: string): Promise<Cost>;
    createNewCost(dto: CreateCostDto): Promise<Cost>;
    updateCost(dto: UpdateCostDto, id: string, userId: string): Promise<Cost>;
    deleteCost(id: string, userId: string): Promise<void>;
}
