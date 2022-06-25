import { SchoolsService } from './schools.service.js';

describe('SchoolsService', () => {
  let service: SchoolsService;

  beforeEach(async () => {
    service = new SchoolsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be greater than 0', async () => {
    expect((await service.getSchools()).length).toBeGreaterThan(0);
  });
});
