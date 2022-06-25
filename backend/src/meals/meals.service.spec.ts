import { MealsService } from './meals.service';

describe('MealsService', () => {
  let service: MealsService;

  beforeEach(async () => {
    service = new MealsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error', () => {
    expect(service.getMeals('', '', '')).rejects.toThrowError();
  });
});
