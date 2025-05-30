import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionLayoutComponent } from './inscription-layout.component';

describe('InscriptionLayoutComponent', () => {
  let component: InscriptionLayoutComponent;
  let fixture: ComponentFixture<InscriptionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
