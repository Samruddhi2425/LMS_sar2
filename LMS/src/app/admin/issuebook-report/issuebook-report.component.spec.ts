import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuebookReportComponent } from './issuebook-report.component';

describe('IssuebookReportComponent', () => {
  let component: IssuebookReportComponent;
  let fixture: ComponentFixture<IssuebookReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuebookReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuebookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
