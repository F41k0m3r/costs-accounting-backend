import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cost, CostsDocument } from './costs.schema';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';

@Injectable()
export class CostsService {
  constructor(
    @InjectModel(Cost.name) private costsModel: Model<CostsDocument>,
  ) {}

  async findAll(): Promise<Cost[]> {
    return this.costsModel.find();
  }

  async findOne(id: string): Promise<Cost> {
    return this.costsModel.findOne({ _id: id });
  }

  async createNewCost(dto: CreateCostDto): Promise<Cost> {
    return new this.costsModel(dto).save();
  }

  async updateCost(
    dto: UpdateCostDto,
    id: string,
    userId: string,
  ): Promise<Cost> {
    const cost = await this.costsModel.findOne({ _id: id });
    const date = Date.now();

    if (cost.userId !== userId && userId !== process.env.ADMIN_ID) {
      throw new UnauthorizedException(
        'You have not access to delete this cost',
      );
    }

    await this.costsModel.updateOne(
      { _id: id },
      {
        $set: {
          ...dto,
        },
      },
    );
    return this.findOne(id);
  }

  async deleteCost(id: string, userId: string): Promise<void> {
    const cost = await this.costsModel.findOne({ _id: id });

    if (!cost) {
      throw new BadRequestException('Cost doest not exist');
    }

    if (cost.userId !== userId && userId !== process.env.ADMIN_ID) {
      throw new UnauthorizedException(
        'You have not access to delete this cost',
      );
    }

    await this.costsModel.deleteOne({ _id: id });
  }
}
