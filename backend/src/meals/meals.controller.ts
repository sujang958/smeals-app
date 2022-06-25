import { Controller, Get, Query } from '@nestjs/common';
import { Meal } from './entities/meal.entity';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get('/')
  async getMeals(
    @Query('code') code: string,
    @Query('scCode') scCode: string,
    @Query('date') date: string,
  ): Promise<Meal> {
    return await this.mealsService.getMeals(code, scCode, date);
  }
}
