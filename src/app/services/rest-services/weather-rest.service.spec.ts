import { TestBed } from '@angular/core/testing';

import { WeatherRestService } from './weather-rest.service';

describe('WeatherRestService', () => {
  let service: WeatherRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
