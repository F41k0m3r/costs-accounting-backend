import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import configuration from './config/DB.configuration';
import { MongooseConfigService } from './config/Mongoose.config';
import { CostsModule } from './costs/costs.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    UserModule,
    AuthModule,
    CostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
