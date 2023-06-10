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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const costs_schema_1 = require("./costs.schema");
let CostsService = class CostsService {
    constructor(costsModel) {
        this.costsModel = costsModel;
    }
    async findAll() {
        return this.costsModel.find();
    }
    async findOne(id) {
        return this.costsModel.findOne({ _id: id });
    }
    async createNewCost(dto) {
        return new this.costsModel(dto).save();
    }
    async updateCost(dto, id, userId) {
        const cost = await this.costsModel.findOne({ _id: id });
        const date = Date.now();
        if (cost.userId !== userId && userId !== process.env.ADMIN_ID) {
            throw new common_1.UnauthorizedException('You have not access to delete this cost');
        }
        await this.costsModel.updateOne({ _id: id }, {
            $set: Object.assign({}, dto),
        });
        return this.findOne(id);
    }
    async deleteCost(id, userId) {
        const cost = await this.costsModel.findOne({ _id: id });
        if (!cost) {
            throw new common_1.BadRequestException('Cost doest not exist');
        }
        if (cost.userId !== userId && userId !== process.env.ADMIN_ID) {
            throw new common_1.UnauthorizedException('You have not access to delete this cost');
        }
        await this.costsModel.deleteOne({ _id: id });
    }
};
CostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(costs_schema_1.Cost.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CostsService);
exports.CostsService = CostsService;
//# sourceMappingURL=costs.service.js.map