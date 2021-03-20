import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationDialogComponent } from './add-evaluation-dialog.component';

describe('AddEvaluationDialogComponent', () => {
  let component: AddEvaluationDialogComponent;
  let fixture: ComponentFixture<AddEvaluationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
