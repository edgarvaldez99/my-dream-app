import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddUserDialogComponent } from './admin-add-user-dialog.component';

describe('AdminAddUserDialogComponent', () => {
  let component: AdminAddUserDialogComponent;
  let fixture: ComponentFixture<AdminAddUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
