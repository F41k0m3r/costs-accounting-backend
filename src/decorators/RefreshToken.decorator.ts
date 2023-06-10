import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from 'src/guards/RefreshToken.guard';

export const RefreshToken = () => UseGuards(RefreshTokenGuard);
