import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallUserListComponent } from './small-user-list.component';

describe('SmallUserListComponent', () => {
  let component: SmallUserListComponent;
  let fixture: ComponentFixture<SmallUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
