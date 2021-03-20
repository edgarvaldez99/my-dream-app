import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material/material.module';

import { HttpErrorSnackBarComponent } from './http-error-snack-bar.component';

describe('HttpErrorSnackBarComponent', () => {
  let component: HttpErrorSnackBarComponent;
  let fixture: ComponentFixture<HttpErrorSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        { provide: MatSnackBarRef, useValue: MatSnackBar },
        { provide: MAT_SNACK_BAR_DATA, useValue: ['Error1'] },
      ],
      declarations: [ HttpErrorSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpErrorSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
