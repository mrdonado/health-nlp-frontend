import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AnalysisFormComponent } from './analysis-form.component';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalysisFormComponent],
      providers: [
        MockBackend,
        BaseRequestOptions,
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
    (_sessionService, _mockBackend) => {
      backend = _mockBackend;
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
