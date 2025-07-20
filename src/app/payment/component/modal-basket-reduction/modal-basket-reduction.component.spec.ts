import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBasketReductionComponent } from './modal-basket-reduction.component';

describe('ModalBasketReductionComponent', () => {
  let component: ModalBasketReductionComponent;
  let fixture: ComponentFixture<ModalBasketReductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBasketReductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBasketReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
