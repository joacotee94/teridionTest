import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDealComponent } from './register-deal.component';

describe('RegisterDealComponent', () => {
  let component: RegisterDealComponent;
  let fixture: ComponentFixture<RegisterDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
