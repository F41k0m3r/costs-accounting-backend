import { UseGuards } from '@nestjs/common';
import { AccessGuard } from 'src/guards/Access.guard';

export const Auth = () => UseGuards(AccessGuard);
