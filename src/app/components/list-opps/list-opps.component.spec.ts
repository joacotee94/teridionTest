import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOppsComponent } from './list-opps.component';

describe('ListOppsComponent', () => {
  let component: ListOppsComponent;
  let fixture: ComponentFixture<ListOppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
