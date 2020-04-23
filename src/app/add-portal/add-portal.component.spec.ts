import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortalComponent } from './add-portal.component';

describe('AddPortalComponent', () => {
  let component: AddPortalComponent;
  let fixture: ComponentFixture<AddPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
