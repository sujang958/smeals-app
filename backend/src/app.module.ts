import { Module } from '@nestjs/common';
import { SchoolsModule } from './schools/schools.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [SchoolsModule, MealsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
