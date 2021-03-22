import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProyectoInversionService } from './proyecto-inversion.service';

describe('ProyectoInversionService', () => {
  let service: ProyectoInversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProyectoInversionService],
    });
    service = TestBed.inject(ProyectoInversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
