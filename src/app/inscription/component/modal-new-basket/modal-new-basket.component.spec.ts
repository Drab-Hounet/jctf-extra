import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewBasketComponent } from './modal-new-basket.component';

describe('ModalNewBasketComponent', () => {
  let component: ModalNewBasketComponent;
  let fixture: ComponentFixture<ModalNewBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalNewBasketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
