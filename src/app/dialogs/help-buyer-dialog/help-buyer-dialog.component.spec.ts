import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBuyerDialogComponent } from './help-buyer-dialog.component';

describe('HelpBuyerDialogComponent', () => {
  let component: HelpBuyerDialogComponent;
  let fixture: ComponentFixture<HelpBuyerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpBuyerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpBuyerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
