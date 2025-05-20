import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdescriptionComponent } from './bookdescription.component';

describe('BookdescriptionComponent', () => {
  let component: BookdescriptionComponent;
  let fixture: ComponentFixture<BookdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookdescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
