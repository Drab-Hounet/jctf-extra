import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserLayoutComponent } from './new-user.component-layout';

describe('NewUserComponent', () => {
  let component: NewUserLayoutComponent;
  let fixture: ComponentFixture<NewUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUserLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
