import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAdherentComponent } from './modal-create-adherent.component';

describe('ModalCreateAdherentComponent', () => {
  let component: ModalCreateAdherentComponent;
  let fixture: ComponentFixture<ModalCreateAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateAdherentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
