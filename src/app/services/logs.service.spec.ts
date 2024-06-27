import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogsService } from './logs.service';

interface LogsApiResponse {
  logs: any[];
  total: number;
}

// describe('LogsService', () => {
//   let service: LogsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(LogsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

describe('LogsService', () => {
  let service: LogsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogsService]
    });
    service = TestBed.inject(LogsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch logs list', () => {
    const dummyResponse: LogsApiResponse = {
      logs: [
        { id: 1, message: 'Log 1' },
        { id: 2, message: 'Log 2' }
      ],
      total: 2
    };

    service.getLogsList(0, 10).subscribe(response => {
      expect(response.logs.length).toBe(2);
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3001/logs?from=0&size=10');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should add a log', () => {
    const newLog = { id: 3, message: 'Log 3' };

    service.addLogs(newLog).subscribe(log => {
      expect(log).toEqual(newLog);
    });

    const req = httpMock.expectOne('http://localhost:3001/logs');
    expect(req.request.method).toBe('POST');
    req.flush(newLog);
  });
});