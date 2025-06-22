import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdhesionDetailsComponent } from './modal-adhesion-details.component';

describe('ModalAdhesionDetailsComponent', () => {
  let component: ModalAdhesionDetailsComponent;
  let fixture: ComponentFixture<ModalAdhesionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdhesionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAdhesionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
