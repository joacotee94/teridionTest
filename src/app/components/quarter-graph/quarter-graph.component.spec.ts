import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterGraphComponent } from './quarter-graph.component';

describe('QuarterGraphComponent', () => {
  let component: QuarterGraphComponent;
  let fixture: ComponentFixture<QuarterGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
