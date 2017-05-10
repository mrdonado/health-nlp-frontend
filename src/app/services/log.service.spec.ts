import { TestBed, inject } from '@angular/core/testing';

import { LogService } from './log.service';

describe('LogService', () => {

  let logService: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogService]
    });
  });

  beforeEach(inject([LogService], (service: LogService) => {
    logService = service;
  }));

  it('should receive and broadcast log messages', (done) => {
    logService.getMessageBus()
      .subscribe((message) => {
        expect(message).toEqual('Some random message');
        done();
      });
    logService.sendMessage('Some random message');
  });
});

