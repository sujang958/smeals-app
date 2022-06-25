import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';

describe('SchoolsController', () => {
  let controller: SchoolsController;
  let service: SchoolsService;

  beforeEach(async () => {
    service = new SchoolsService();
    controller = new SchoolsController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller.getSchools()).resolves.toBeDefined();
  });
});
