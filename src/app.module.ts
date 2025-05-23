import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilterModule } from './filter/filter.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupModule } from './group/group.module';
@Module({
  imports: [UserModule, PrismaModule, FilterModule, GroupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
