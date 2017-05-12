import { LogService } from '../../../services/log.service';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AnalysisFormComponent } from './analysis-form.component';
import { FormsModule } from '@angular/forms';

import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  RequestMethod,
  XHRBackend
} from '@angular/http';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

describe('AnalysisFormComponent', () => {
  let component: AnalysisFormComponent;
  let fixture: ComponentFixture<AnalysisFormComponent>;
  let backend: MockBackend;

  const logServiceSpy = jasmine.createSpyObj('logService', ['sendMessage']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisFormComponent],
      imports: [FormsModule],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: LogService,
          useValue: logServiceSpy
        },
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MockBackend],
    (_mockBackend) => {
      backend = _mockBackend;
    }));

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the form after closing', () => {
    component.message = 'someMessage';
    component.userName = 'someUserName';
    component.userDescription = 'someDescription';
    expect(component.message).toEqual('someMessage');
    expect(component.userName).toEqual('someUserName');
    expect(component.userDescription).toEqual('someDescription');
    component.closeForm();
    expect(component.message).toEqual('');
    expect(component.userName).toEqual('');
    expect(component.userDescription).toEqual('');
  });

  it('should send a POST request to the server when creating a new job for the analysis engine', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      const responseBody = JSON.parse(connection.request.getBody());
      expect(responseBody.source).toEqual('web');
      expect(responseBody.user_name).toEqual('someUserName');
      expect(responseBody.user_description).toEqual('someDescription');
      expect(responseBody.message).toEqual('someMessage');
      connection.mockRespond(new Response(new ResponseOptions({})));
      done();
    });
    component.message = 'someMessage';
    component.userName = 'someUserName';
    component.userDescription = 'someDescription'; component.sendNewJob();
  });

  it('should log an error message when the analysis couldn\'t be POSTed', (done) => {
    const errorMessage = 'An error occurred!!!';
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Post);
      const responseBody = JSON.parse(connection.request.getBody());
      connection.mockError(new Error(errorMessage));
    });
    component.message = 'someMessage';
    component.userName = 'someUserName';
    component.userDescription = 'someDescription';
    try {
      component.sendNewJob();
    } catch (err) {
      expect(err.message).toEqual(errorMessage);
      expect(logServiceSpy.sendMessage).toHaveBeenCalledWith(jasmine.stringMatching('a problem'));
      done();
    }
  });

});
