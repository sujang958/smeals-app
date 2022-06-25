import { Controller, Get, Query } from '@nestjs/common';
import { SchoolsService } from './schools.service.js';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Get('/')
  async getSchools(@Query('query') query?: string) {
    return this.schoolsService.getSchools(query);
  }
}
