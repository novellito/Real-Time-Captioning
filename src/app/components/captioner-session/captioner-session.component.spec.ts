import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptionerSessionComponent } from './captioner-session.component';

describe('CaptionerSessionComponent', () => {
  let component: CaptionerSessionComponent;
  let fixture: ComponentFixture<CaptionerSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptionerSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptionerSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
