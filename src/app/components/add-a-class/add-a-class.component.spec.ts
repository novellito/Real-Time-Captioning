import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAClassComponent } from './add-a-class.component';

describe('AddAClassComponent', () => {
  let component: AddAClassComponent;
  let fixture: ComponentFixture<AddAClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
