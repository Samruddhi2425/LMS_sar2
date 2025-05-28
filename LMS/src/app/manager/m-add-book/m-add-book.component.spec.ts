import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAddBookComponent } from './m-add-book.component';

describe('MAddBookComponent', () => {
  let component: MAddBookComponent;
  let fixture: ComponentFixture<MAddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MAddBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
