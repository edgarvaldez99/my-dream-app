import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockDialogData } from 'src/app/interfaces/dialog-data';

import { AdminAddCurrencyDialogComponent } from './admin-add-currency-dialog.component';

describe('AdminAddCurrencyDialogComponent', () => {
  let component: AdminAddCurrencyDialogComponent;
  let fixture: ComponentFixture<AdminAddCurrencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: MatDialog },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
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
