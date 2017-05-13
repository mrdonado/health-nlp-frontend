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

  it('should be activated for 2.5s when a message is sent, and then deactivated again.', (done) => {
    jasmine.clock().install();
    expect(component.activeMessage).toBeFalsy();
    testSubject.next('Some log message');
    jasmine.clock().tick(10);
    expect(component.activeMessage).toBeTruthy();
    fixture.detectChanges();
    const toasterDiv = fixture.elementRef.nativeElement.querySelector('#simple-toaster');
    expect(toasterDiv.className).toMatch('active');
    jasmine.clock().tick(2500);
    expect(component.activeMessage).toBeFalsy();
    jasmine.clock().uninstall();
    done();
  });
});
