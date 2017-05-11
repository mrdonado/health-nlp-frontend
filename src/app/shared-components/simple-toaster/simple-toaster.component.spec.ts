import { Subject } from 'rxjs/Rx';
import { LogService } from '../../services/log.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleToasterComponent } from './simple-toaster.component';

describe('SimpleToasterComponent', () => {
  let component: SimpleToasterComponent;
  let fixture: ComponentFixture<SimpleToasterComponent>;
  const testSubject = new Subject<string>();
  const logServiceMock = {
    getMessageBus: () => {
      return testSubject;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: LogService,
        useValue: logServiceMock
      }],
      declarations: [SimpleToasterComponent]
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
