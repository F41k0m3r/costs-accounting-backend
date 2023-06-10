import { UseGuards } from '@nestjs/common';
import { SignInGuard } from 'src/guards/SignIn.guard';

export const SignIn = () => UseGuards(SignInGuard);
