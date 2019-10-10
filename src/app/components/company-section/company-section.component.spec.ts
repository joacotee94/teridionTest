import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySectionComponent } from './company-section.component';

describe('CompanySectionComponent', () => {
  let component: CompanySectionComponent;
  let fixture: ComponentFixture<CompanySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
