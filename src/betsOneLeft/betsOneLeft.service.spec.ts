import { Test, TestingModule } from '@nestjs/testing';
import { BetsOneLeftService } from './betsOneLeft.service';

describe('BetsOneLeftService', () => {
  let service: BetsOneLeftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BetsOneLeftService],
    }).compile();

    service = module.get<BetsOneLeftService>(BetsOneLeftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
