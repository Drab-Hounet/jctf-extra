import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHelloAssoComponent } from './button-hello-asso.component';

describe('ButtonHelloAssoComponent', () => {
  let component: ButtonHelloAssoComponent;
  let fixture: ComponentFixture<ButtonHelloAssoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHelloAssoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonHelloAssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
