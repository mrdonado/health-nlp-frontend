import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFire } from 'angularfire2';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { ReversePipe } from '../../custom-pipes/reverse.pipe';
import { DemoComponent } from './demo.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('DemoComponent', () => {

  let _collection = 'unknown';
  let _options = {};
  let subscriptions = 0;

  const AngularFireMock = {
    database: {
      list: (collection, options) => {
        _collection = collection;
        _options = options;
        return {
          subscribe: (cb) => {
            subscriptions += 1;
            const demoAnalysis = {
              message: 'Some message with a problem and a solution',
              analysis: {
                problem: 'a problem',
                solution: 'a solution'
              }
            };
            cb([Object.assign({ $key: 15 }, demoAnalysis),
            Object.assign({ $key: 16 }, demoAnalysis)]);
          }
        }
      }
    }
  };

  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DemoComponent, ReversePipe],
      providers: [
        {
          provide: AngularFire,
          useValue: AngularFireMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a collection /analysis', () => {
    expect(_collection).toEqual('/analysis');
    expect(_options).toEqual({ query: { limitToLast: 5, orderByKey: true } });
  });

  it('should request more items after running moreResults', () => {
    subscriptions = 0;
    component.moreResults();
    expect(_options).toEqual({ query: { limitToLast: 6, orderByKey: true, endAt: 15 } });
    expect(subscriptions).toEqual(1);
  });

  it('should colorize the message accordingly', () => {
    let item = {
      message: 'Some message with a problem and a solution',
      analysis: {
        problem: 'a problem',
        solution: 'a solution'
      }
    };
    let htmlMessage = component.formatMessage(item);
    expect(htmlMessage).toEqual('Some message with <strong class="problem">' +
      'a problem</strong> and <strong class="solution">a solution</strong>');

    item = {
      message: 'Some message with no problem and no solution',
      analysis: {
        problem: 'a problem',
        solution: 'a solution'
      }
    };
    htmlMessage = component.formatMessage(item);
    expect(htmlMessage).toEqual('Some message with no problem and no solution');

    item = {
      message: 'Some message with a problem and no solution',
      analysis: {
        problem: 'a problem',
        solution: 'a solution'
      }
    };
    htmlMessage = component.formatMessage(item);
    expect(htmlMessage).toEqual('Some message with <strong class="problem">a problem</strong> and no solution');
  });

});
