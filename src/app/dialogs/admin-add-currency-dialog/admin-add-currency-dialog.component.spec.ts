import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCurrencyDialogComponent } from './admin-add-currency-dialog.component';

describe('AdminAddCurrencyDialogComponent', () => {
  let component: AdminAddCurrencyDialogComponent;
  let fixture: ComponentFixture<AdminAddCurrencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCurrencyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
