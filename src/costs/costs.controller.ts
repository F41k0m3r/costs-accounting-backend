import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { Auth } from "src/decorators/Auth.decorator";
import { CostsService } from "./costs.service";
import { CreateCostDto } from "./dto/create-cost.dto";
import { UpdateCostDto } from "./dto/update-cost.dto";

@Controller("costs")
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
    private readonly authService: AuthService
  ) {}

  @Get()
  @Auth()
  async getAllCosts(@Req() request) {
    const user = await this.authService.getUserByToken(request.token);
    const costs = await this.costsService.findAll();

    const userCosts = costs.filter((cost) => cost.userId === user._id);
    return userCosts;
  }

  @Get("/admin")
  @Auth()
  async getAllAdminCosts(@Req() request) {
    const user = await this.authService.getUserByToken(request.token);

    if (user._id !== process.env.ADMIN_ID) {
      throw new BadRequestException("You have no access");
    }

    const costs = await this.costsService.findAll();

    return costs;
  }

  @Post("/create")
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  async createCost(@Body() dto: CreateCostDto, @Req() request) {
    const user = await this.authService.getUserByToken(request.token);

    return await this.costsService.createNewCost({
      ...dto,
      userId: user._id as string,
    });
  }

  @Auth()
  @Patch("/update/:id")
  @HttpCode(HttpStatus.OK)
  async updateCost(
    @Body() dto: UpdateCostDto,
    @Param("id") id: string,
    @Req() request
  ) {
    const userId = (await this.authService.getUserByToken(request.token)
      ._id) as string;

    return await this.costsService.updateCost(dto, id, userId);
  }

  @Auth()
  @Delete("/delete/:id")
  @HttpCode(HttpStatus.OK)
  async deleteCost(@Param("id") id: string, @Req() request) {
    const userId = (await this.authService.getUserByToken(request.token)
      ._id) as string;
    console.log(request);
    await this.costsService.deleteCost(id, userId);

    return "Cost successfully deleted";
  }
}
