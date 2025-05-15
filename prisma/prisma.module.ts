import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // グローバルモジュールとして扱う場合
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
