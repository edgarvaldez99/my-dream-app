import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mockDialogData } from 'src/app/interfaces/dialog-data';

import { ActiveInactiveDialogComponent } from './active-inactive-dialog.component';

describe('ActiveInactiveDialogComponent', () => {
  let component: ActiveInactiveDialogComponent;
  let fixture: ComponentFixture<ActiveInactiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: MatDialog },
        { provide: MatSnackBarRef, useValue: MatSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
      declarations: [ ActiveInactiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveInactiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
