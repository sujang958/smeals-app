import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  controllers: [MealsController],
  providers: [MealsService]
})
export class MealsModule {}
