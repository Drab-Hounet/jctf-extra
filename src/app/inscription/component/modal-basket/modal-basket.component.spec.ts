import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBasketComponent } from './modal-basket.component';

describe('ModalBasketComponent', () => {
  let component: ModalBasketComponent;
  let fixture: ComponentFixture<ModalBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBasketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
