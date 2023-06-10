import { UseGuards } from '@nestjs/common';
import { SignUpGuard } from 'src/guards/SignUp.guard';

export const SignUp = () => UseGuards(SignUpGuard);
