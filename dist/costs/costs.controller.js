"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostsController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const Auth_decorator_1 = require("../decorators/Auth.decorator");
const costs_service_1 = require("./costs.service");
const create_cost_dto_1 = require("./dto/create-cost.dto");
const update_cost_dto_1 = require("./dto/update-cost.dto");
let CostsController = class CostsController {
    constructor(costsService, authService) {
        this.costsService = costsService;
        this.authService = authService;
    }
    async getAllCosts(request) {
        const user = await this.authService.getUserByToken(request.token);
        const costs = await this.costsService.findAll();
        const userCosts = costs.filter((cost) => cost.userId === user._id);
        return userCosts;
    }
    async getAllAdminCosts(request) {
        const user = await this.authService.getUserByToken(request.token);
        if (user._id !== process.env.ADMIN_ID) {
            throw new common_1.BadRequestException("You have no access");
        }
        const costs = await this.costsService.findAll();
        return costs;
    }
    async createCost(dto, request) {
        const user = await this.authService.getUserByToken(request.token);
        return await this.costsService.createNewCost(Object.assign(Object.assign({}, dto), { userId: user._id }));
    }
    async updateCost(dto, id, request) {
        const userId = (await this.authService.getUserByToken(request.token)
            ._id);
        return await this.costsService.updateCost(dto, id, userId);
    }
    async deleteCost(id, request) {
        const userId = (await this.authService.getUserByToken(request.token)
            ._id);
        console.log(request);
        await this.costsService.deleteCost(id, userId);
        return "Cost successfully deleted";
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, Auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "getAllCosts", null);
__decorate([
    (0, common_1.Get)("/admin"),
    (0, Auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "getAllAdminCosts", null);
__decorate([
    (0, common_1.Post)("/create"),
    (0, Auth_decorator_1.Auth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cost_dto_1.CreateCostDto, Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "createCost", null);
__decorate([
    (0, Auth_decorator_1.Auth)(),
    (0, common_1.Patch)("/update/:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cost_dto_1.UpdateCostDto, String, Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "updateCost", null);
__decorate([
    (0, Auth_decorator_1.Auth)(),
    (0, common_1.Delete)("/delete/:id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CostsController.prototype, "deleteCost", null);
CostsController = __decorate([
    (0, common_1.Controller)("costs"),
    __metadata("design:paramtypes", [costs_service_1.CostsService,
        auth_service_1.AuthService])
], CostsController);
exports.CostsController = CostsController;
//# sourceMappingURL=costs.controller.js.map