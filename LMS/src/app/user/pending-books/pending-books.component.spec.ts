import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingBooksComponent } from './pending-books.component';

describe('PendingBooksComponent', () => {
  let component: PendingBooksComponent;
  let fixture: ComponentFixture<PendingBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
