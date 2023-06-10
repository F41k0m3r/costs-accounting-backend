"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "http://localhost:5173",
        credentials: true,
    });
    app.use(cookieParser());
    app.setGlobalPrefix("/api");
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map