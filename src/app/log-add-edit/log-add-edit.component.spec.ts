import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogAddEditComponent } from './log-add-edit.component';

describe('LogAddEditComponent', () => {
  let component: LogAddEditComponent;
  let fixture: ComponentFixture<LogAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      declarations: [ LogAddEditComponent ],
      providers: [
        FormBuilder, // Provide FormBuilder
        { provide: MatDialogRef, useValue: {} } // Mock MatDialogRef
      ]
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
