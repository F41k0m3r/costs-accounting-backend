import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateCostDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly price: number;
}
