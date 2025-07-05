import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionNewComponent } from './inscription-new.component';

describe('InscriptionNewComponent', () => {
  let component: InscriptionNewComponent;
  let fixture: ComponentFixture<InscriptionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
