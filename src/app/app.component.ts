import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogsService } from './services/logs.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { LogAddEditComponent } from './log-add-edit/log-add-edit.component';


interface LogData {
  _type:string;
  _id:string;
  agent: string;
  bytes: number;
  clientip: string;
  extension: string;
  geo: {
    srcdest: string;
    src: string;
    dest: string;
    coordinates: {
      lat: number;
      lon: number;
    }
  };
  host: string;
  index: string;
  ip: string;
  machine: {
    ram: number;
    os: string;
  };
  memory: any;
  message: string;
  phpmemory: any;
  referer: string;
  request: string;
  response: number;
  tags: string[];
  timestamp: string;
  url: string;
  utc_time: string;
  event: {
    dataset: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'Logs-Search-lib';
  displayedColumns: string[] = [ 'index','_type', '_id', 'clientip', 'host', 'timestamp', 'referer','agent', 'message'];
  dataSource: MatTableDataSource<LogData> = new MatTableDataSource<LogData>([]);
  totalLogs: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  private subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _logService: LogsService) { }

  ngOnInit(): void {
    this.getLogsList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getLogsList() {
    const from = this.pageIndex * this.pageSize;
    const size = this.pageSize;

    console.log(`Fetching logs with from: ${from}, size: ${size}`);
    this.subscription.add(
      this._logService.getLogsList(from, size).subscribe({
        next: (res: any) => {
          console.log('API Response:', res);
          this.dataSource.data = res.logs;
          this.totalLogs = res.total;
          console.log('Total Logs:', this.totalLogs);
          console.log('Current Data:', this.dataSource.data);

          // Ensure paginator length is updated correctly
          setTimeout(() => this.updatePaginator(), 100); // Add a delay to ensure correct updating


          // Ensure paginator length is updated correctly
          this.updatePaginator();

          // Log paginator button state
          this.logPaginatorButtonState();
        },
        error: (error) => {
          console.error('Error fetching logs:', error);
        }
      })
    );
  }

  onPageChange(event: PageEvent) {
    console.log('Page changed:', event);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log(`New pageIndex: ${this.pageIndex}, pageSize: ${this.pageSize}`);
    this.getLogsList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openLogAddEditForm() {
    this._dialog.open(LogAddEditComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  private updatePaginator() {
    if (this.paginator) {
      this.paginator.length = this.totalLogs;
      console.log('Paginator Length Set To:', this.paginator.length);  // Debugging paginator length
      this.paginator.pageIndex = this.pageIndex;
    }
  }

  private logPaginatorButtonState() {
    setTimeout(() => {
      if (this.paginator) {
        const previousPageDisabled = !this.paginator.hasPreviousPage();
        const nextPageDisabled = !this.paginator.hasNextPage();
        console.log('Paginator Length:', this.paginator.length);
        console.log('Current Page Index:', this.pageIndex);
        console.log('Previous Page Disabled:', previousPageDisabled);
        console.log('Next Page Disabled:', nextPageDisabled);
      }
    }, 100); // Delay to ensure paginator state updates
  }
}
