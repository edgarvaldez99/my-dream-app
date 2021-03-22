import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AddEvaluationDialogComponent } from './add-evaluation-dialog.component';

describe('AddEvaluationDialogComponent', () => {
  let component: AddEvaluationDialogComponent;
  let fixture: ComponentFixture<AddEvaluationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: MatDialog },
      ],
      declarations: [ AddEvaluationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvaluationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
