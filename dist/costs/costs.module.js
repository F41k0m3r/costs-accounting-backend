"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const costs_controller_1 = require("./costs.controller");
const costs_schema_1 = require("./costs.schema");
const costs_service_1 = require("./costs.service");
let CostsModule = class CostsModule {
};
CostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: costs_schema_1.Cost.name, schema: costs_schema_1.CostsSchema }]),
            auth_module_1.AuthModule,
        ],
        controllers: [costs_controller_1.CostsController],
        providers: [costs_service_1.CostsService],
    })
], CostsModule);
exports.CostsModule = CostsModule;
//# sourceMappingURL=costs.module.js.map