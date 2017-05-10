import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleToasterComponent } from './simple-toaster.component';

describe('SimpleToasterComponent', () => {
  let component: SimpleToasterComponent;
  let fixture: ComponentFixture<SimpleToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleToasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
