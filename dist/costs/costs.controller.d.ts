import { AuthService } from "src/auth/auth.service";
import { CostsService } from "./costs.service";
import { CreateCostDto } from "./dto/create-cost.dto";
import { UpdateCostDto } from "./dto/update-cost.dto";
export declare class CostsController {
    private readonly costsService;
    private readonly authService;
    constructor(costsService: CostsService, authService: AuthService);
    getAllCosts(request: any): unknown;
    getAllAdminCosts(request: any): unknown;
    createCost(dto: CreateCostDto, request: any): unknown;
    updateCost(dto: UpdateCostDto, id: string, request: any): unknown;
    deleteCost(id: string, request: any): unknown;
}
