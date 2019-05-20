import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDocsComponentComponent } from './partner-docs-component.component';

describe('PartnerDocsComponentComponent', () => {
  let component: PartnerDocsComponentComponent;
  let fixture: ComponentFixture<PartnerDocsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerDocsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerDocsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
