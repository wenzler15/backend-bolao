import { Test, TestingModule } from '@nestjs/testing';
import { BetsRoundsService } from './betsRounds.service';

describe('BetsRoundsService', () => {
  let service: BetsRoundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetsRoundsService],
    }).compile();

    service = module.get<BetsRoundsService>(BetsRoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
