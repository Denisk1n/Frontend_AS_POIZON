import { TestBed } from '@angular/core/testing';

import { AdminPanelLogic } from './admin-panel-logic';

describe('AdminPanelLogic', () => {
  let service: AdminPanelLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPanelLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
