import { TestBed } from '@angular/core/testing';

import { RecipeSerivceService } from './recipe-serivce.service';

describe('RecipeSerivceService', () => {
  let service: RecipeSerivceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeSerivceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
