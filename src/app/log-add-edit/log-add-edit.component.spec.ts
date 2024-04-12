import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAddEditComponent } from './log-add-edit.component';

describe('LogAddEditComponent', () => {
  let component: LogAddEditComponent;
  let fixture: ComponentFixture<LogAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
