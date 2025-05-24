import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbookComponent } from './viewbook.component';

describe('ViewbookComponent', () => {
  let component: ViewbookComponent;
  let fixture: ComponentFixture<ViewbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
