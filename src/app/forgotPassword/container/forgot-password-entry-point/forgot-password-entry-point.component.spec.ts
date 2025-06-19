import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordEntryPointComponent } from './forgot-password-entry-point.component';

describe('ForgotPasswordEntryPointComponent', () => {
  let component: ForgotPasswordEntryPointComponent;
  let fixture: ComponentFixture<ForgotPasswordEntryPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordEntryPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordEntryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
